/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace Library {
  export type StudentStruct = {
    _address: AddressLike;
    id: BigNumberish;
    npm: string;
    name: string;
    accumulatedCredits: BigNumberish;
    grantedDegreeId: BigNumberish;
    curriculumId: BigNumberish;
    totalCreditsTaken: BigNumberish;
    weightedTotalGrade: BigNumberish;
  };

  export type StudentStructOutput = [
    _address: string,
    id: bigint,
    npm: string,
    name: string,
    accumulatedCredits: bigint,
    grantedDegreeId: bigint,
    curriculumId: bigint,
    totalCreditsTaken: bigint,
    weightedTotalGrade: bigint
  ] & {
    _address: string;
    id: bigint;
    npm: string;
    name: string;
    accumulatedCredits: bigint;
    grantedDegreeId: bigint;
    curriculumId: bigint;
    totalCreditsTaken: bigint;
    weightedTotalGrade: bigint;
  };

  export type AcademicRecordStruct = {
    semester: string;
    status: string;
    totalCreditsPassed: BigNumberish;
    passedCoursesId: BigNumberish[];
    takenCoursesId: BigNumberish[];
    takenCoursesGrade: BigNumberish[];
    totalCreditsTaken: BigNumberish;
    weightedTotalGrade: BigNumberish;
    weightedTotalPassedGrade: BigNumberish;
  };

  export type AcademicRecordStructOutput = [
    semester: string,
    status: string,
    totalCreditsPassed: bigint,
    passedCoursesId: bigint[],
    takenCoursesId: bigint[],
    takenCoursesGrade: bigint[],
    totalCreditsTaken: bigint,
    weightedTotalGrade: bigint,
    weightedTotalPassedGrade: bigint
  ] & {
    semester: string;
    status: string;
    totalCreditsPassed: bigint;
    passedCoursesId: bigint[];
    takenCoursesId: bigint[];
    takenCoursesGrade: bigint[];
    totalCreditsTaken: bigint;
    weightedTotalGrade: bigint;
    weightedTotalPassedGrade: bigint;
  };
}

export interface CurriculumContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addACourse"
      | "addAStudent"
      | "addAnAcademicRecord"
      | "addressToStudents"
      | "courses"
      | "coursesId"
      | "curriculumDetail"
      | "getStudentInformation"
      | "mandatoryCourseIDs"
      | "owner"
      | "ownerContract"
      | "students"
      | "studentsId"
      | "toggleActive"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addACourse",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "addAStudent",
    values: [AddressLike, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addAnAcademicRecord",
    values: [
      BigNumberish,
      string,
      string,
      BigNumberish[],
      BigNumberish[],
      BigNumberish[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "addressToStudents",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "courses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "coursesId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "curriculumDetail",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStudentInformation",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mandatoryCourseIDs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "students",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "studentsId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "toggleActive",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "addACourse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addAStudent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAnAcademicRecord",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addressToStudents",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "courses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "coursesId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "curriculumDetail",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStudentInformation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mandatoryCourseIDs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "students", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "studentsId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "toggleActive",
    data: BytesLike
  ): Result;
}

export interface CurriculumContract extends BaseContract {
  connect(runner?: ContractRunner | null): CurriculumContract;
  waitForDeployment(): Promise<this>;

  interface: CurriculumContractInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addACourse: TypedContractMethod<
    [name: string, credits: BigNumberish, isMandatory: boolean],
    [void],
    "nonpayable"
  >;

  addAStudent: TypedContractMethod<
    [
      _address: AddressLike,
      npm: string,
      name: string,
      accumulatedCredit: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  addAnAcademicRecord: TypedContractMethod<
    [
      studentId: BigNumberish,
      semester: string,
      status: string,
      passedCoursesId: BigNumberish[],
      takenCoursesId: BigNumberish[],
      takenCoursesGrade: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  addressToStudents: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  courses: TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, string, bigint] & { id: bigint; name: string; credits: bigint }],
    "view"
  >;

  coursesId: TypedContractMethod<[], [bigint], "view">;

  curriculumDetail: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, boolean] & {
        id: string;
        name: string;
        major: string;
        minimumCredits: bigint;
        active: boolean;
      }
    ],
    "view"
  >;

  getStudentInformation: TypedContractMethod<
    [studentId: BigNumberish],
    [[Library.StudentStructOutput, Library.AcademicRecordStructOutput[]]],
    "view"
  >;

  mandatoryCourseIDs: TypedContractMethod<
    [arg0: BigNumberish],
    [bigint],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  ownerContract: TypedContractMethod<[], [string], "view">;

  students: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        bigint,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        _address: string;
        id: bigint;
        npm: string;
        name: string;
        accumulatedCredits: bigint;
        grantedDegreeId: bigint;
        curriculumId: bigint;
        totalCreditsTaken: bigint;
        weightedTotalGrade: bigint;
      }
    ],
    "view"
  >;

  studentsId: TypedContractMethod<[], [bigint], "view">;

  toggleActive: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addACourse"
  ): TypedContractMethod<
    [name: string, credits: BigNumberish, isMandatory: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addAStudent"
  ): TypedContractMethod<
    [
      _address: AddressLike,
      npm: string,
      name: string,
      accumulatedCredit: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addAnAcademicRecord"
  ): TypedContractMethod<
    [
      studentId: BigNumberish,
      semester: string,
      status: string,
      passedCoursesId: BigNumberish[],
      takenCoursesId: BigNumberish[],
      takenCoursesGrade: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addressToStudents"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "courses"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, string, bigint] & { id: bigint; name: string; credits: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "coursesId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "curriculumDetail"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, boolean] & {
        id: string;
        name: string;
        major: string;
        minimumCredits: bigint;
        active: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getStudentInformation"
  ): TypedContractMethod<
    [studentId: BigNumberish],
    [[Library.StudentStructOutput, Library.AcademicRecordStructOutput[]]],
    "view"
  >;
  getFunction(
    nameOrSignature: "mandatoryCourseIDs"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "ownerContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "students"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        string,
        bigint,
        string,
        string,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint
      ] & {
        _address: string;
        id: bigint;
        npm: string;
        name: string;
        accumulatedCredits: bigint;
        grantedDegreeId: bigint;
        curriculumId: bigint;
        totalCreditsTaken: bigint;
        weightedTotalGrade: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "studentsId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "toggleActive"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
