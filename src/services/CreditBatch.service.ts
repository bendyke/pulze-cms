import { IUserCreditBatches } from '../interfaces/CreditBatch.interfaces';
import CreditBatch, {
  ICreditBatch,
  ICreditBatchDocument,
} from '../models/CreditBatch.model';

export class CreditBatchService {
  async getCreditBatchesByUserId(userId: string): Promise<IUserCreditBatches> {
    // sorting batches by expiration date and make sure they are not expired and have credits left!
    const user_batches = await CreditBatch.find({ userId })
      .sort({ expirationDate: 1 })
      .where('expirationDate')
      .gt(new Date().getTime())
      .where('remainingCredits')
      .gt(0);

    const totalCredits = user_batches.reduce(
      (acc, batch) => acc + batch.totalCredits,
      0
    );

    const usableCredits = user_batches.reduce(
      (acc, batch) => acc + batch.remainingCredits,
      0
    );

    return { usableCredits, totalCredits, creditBatches: user_batches };
  }

  async consumeCreditsForUser(
    userId: string,
    creditsToConsume: number
  ): Promise<IUserCreditBatches> {
    const user_batches = await this.getCreditBatchesByUserId(userId);

    if (user_batches.totalCredits < creditsToConsume) {
      throw new Error('Not enough credits to consume');
    }

    let creditsLeftToConsume = creditsToConsume;

    for (const batch of user_batches.creditBatches) {
      if (creditsLeftToConsume <= 0) break;

      if (batch.remainingCredits >= creditsLeftToConsume) {
        batch.remainingCredits -= creditsLeftToConsume;
        creditsLeftToConsume = 0;
      } else {
        creditsLeftToConsume -= batch.remainingCredits;
        batch.remainingCredits = 0;
      }

      await batch.save();
    }

    // Return the updated credit batches for the user. This could be shortened in the future
    return await this.getCreditBatchesByUserId(userId);
  }

  // Basic CRUD operations
  async createCreditBatch(
    creditBatchData: Partial<ICreditBatch>
  ): Promise<ICreditBatchDocument> {
    //force remainingCredits to be equal to totalCredits to prevent cheating!
    creditBatchData.remainingCredits = creditBatchData.totalCredits;

    const creditBatch = new CreditBatch(creditBatchData);
    return await creditBatch.save();
  }

  async getCreditBatchById(id: string): Promise<ICreditBatchDocument | null> {
    return await CreditBatch.findById(id);
  }

  async getAllCreditBatches(): Promise<ICreditBatchDocument[]> {
    return await CreditBatch.find();
  }

  async updateCreditBatch(
    id: string,
    creditBatchData: Partial<ICreditBatch>
  ): Promise<ICreditBatchDocument | null> {
    return await CreditBatch.findByIdAndUpdate(id, creditBatchData, {
      new: true,
    });
  }

  async deleteCreditBatch(id: string): Promise<ICreditBatchDocument | null> {
    return await CreditBatch.findByIdAndDelete(id);
  }
}

export default new CreditBatchService();
