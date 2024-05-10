import { BrowserProvider } from "ethers/providers";
import log from "loglevel";
import { DegreeToken__factory, DegreeToken, UniversityContract, UniversityContract__factory } from "../typechain-types";

const pddiktiAddress = "0x1ea4e7A798557001b99D88D6b4ba7F7fc79406A9";

export class SmartContract {
  private static _instance: SmartContract | null = null;
  private degreeToken: DegreeToken;
  private universityContract!: UniversityContract;

  private constructor(provider: BrowserProvider) {
    this.degreeToken = DegreeToken__factory.connect(pddiktiAddress, provider);
  }

  public changeUniversity(provider: BrowserProvider, uniAddress: string) {
    this.universityContract = UniversityContract__factory.connect(uniAddress, provider);
    return this;
  }

  public async getStudents(){
    const maxStudent = await this.universityContract.studentsId()
    return await this.universityContract.students(maxStudent)
  }

  public static getInstance(provider: BrowserProvider): SmartContract {
    if (this._instance === null) {
      this._instance = new SmartContract(provider);
    }
    return this._instance;
  }
}
