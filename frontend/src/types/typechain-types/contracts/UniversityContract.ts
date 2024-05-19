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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
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
  };

  export type AcademicRecordStructOutput = [
    semester: string,
    status: string,
    totalCreditsPassed: bigint,
    passedCoursesId: bigint[],
    takenCoursesId: bigint[],
    takenCoursesGrade: bigint[],
    totalCreditsTaken: bigint,
    weightedTotalGrade: bigint
  ] & {
    semester: string;
    status: string;
    totalCreditsPassed: bigint;
    passedCoursesId: bigint[];
    takenCoursesId: bigint[];
    takenCoursesGrade: bigint[];
    totalCreditsTaken: bigint;
    weightedTotalGrade: bigint;
  };
}

export interface UniversityContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addACourse"
      | "addACurriculum"
      | "addAStudent"
      | "addCourseToCurriculum"
      | "addStudentToCurriculum"
      | "courses"
      | "coursesId"
      | "curriculums"
      | "curriculumsId"
      | "getStudentInformation"
      | "students"
      | "studentsId"
      | "universityInfo"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "CurriculumAdded"): EventFragment;

  encodeFunctionData(
    functionFragment: "addACourse",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addACurriculum",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addAStudent",
    values: [AddressLike, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addCourseToCurriculum",
    values: [BigNumberish, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "addStudentToCurriculum",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "courses",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "coursesId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "curriculums",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "curriculumsId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStudentInformation",
    values: [BigNumberish]
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
    functionFragment: "universityInfo",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "addACourse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addACurriculum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addAStudent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addCourseToCurriculum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addStudentToCurriculum",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "courses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "coursesId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "curriculums",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "curriculumsId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStudentInformation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "students", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "studentsId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "universityInfo",
    data: BytesLike
  ): Result;
}

export namespace CurriculumAddedEvent {
  export type InputTuple = [curriculumAddress: AddressLike];
  export type OutputTuple = [curriculumAddress: string];
  export interface OutputObject {
    curriculumAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface UniversityContract extends BaseContract {
  connect(runner?: ContractRunner | null): UniversityContract;
  waitForDeployment(): Promise<this>;

  interface: UniversityContractInterface;

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
    [name: string, credits: BigNumberish],
    [void],
    "nonpayable"
  >;

  addACurriculum: TypedContractMethod<
    [curAddress: AddressLike],
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

  addCourseToCurriculum: TypedContractMethod<
    [courseId: BigNumberish, curriculumId: BigNumberish, isMandatory: boolean],
    [void],
    "nonpayable"
  >;

  addStudentToCurriculum: TypedContractMethod<
    [studentId: BigNumberish, curriculumId: BigNumberish],
    [void],
    "nonpayable"
  >;

  courses: TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, string, bigint] & { id: bigint; name: string; credits: bigint }],
    "view"
  >;

  coursesId: TypedContractMethod<[], [bigint], "view">;

  curriculums: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  curriculumsId: TypedContractMethod<[], [bigint], "view">;

  getStudentInformation: TypedContractMethod<
    [studentId: BigNumberish],
    [[Library.StudentStructOutput, Library.AcademicRecordStructOutput[]]],
    "view"
  >;

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

  universityInfo: TypedContractMethod<
    [],
    [
      [string, string, boolean] & {
        uniAdress: string;
        name: string;
        exists: boolean;
      }
    ],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addACourse"
  ): TypedContractMethod<
    [name: string, credits: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addACurriculum"
  ): TypedContractMethod<[curAddress: AddressLike], [void], "nonpayable">;
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
    nameOrSignature: "addCourseToCurriculum"
  ): TypedContractMethod<
    [courseId: BigNumberish, curriculumId: BigNumberish, isMandatory: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addStudentToCurriculum"
  ): TypedContractMethod<
    [studentId: BigNumberish, curriculumId: BigNumberish],
    [void],
    "nonpayable"
  >;
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
    nameOrSignature: "curriculums"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "curriculumsId"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getStudentInformation"
  ): TypedContractMethod<
    [studentId: BigNumberish],
    [[Library.StudentStructOutput, Library.AcademicRecordStructOutput[]]],
    "view"
  >;
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
    nameOrSignature: "universityInfo"
  ): TypedContractMethod<
    [],
    [
      [string, string, boolean] & {
        uniAdress: string;
        name: string;
        exists: boolean;
      }
    ],
    "view"
  >;

  getEvent(
    key: "CurriculumAdded"
  ): TypedContractEvent<
    CurriculumAddedEvent.InputTuple,
    CurriculumAddedEvent.OutputTuple,
    CurriculumAddedEvent.OutputObject
  >;

  filters: {
    "CurriculumAdded(address)": TypedContractEvent<
      CurriculumAddedEvent.InputTuple,
      CurriculumAddedEvent.OutputTuple,
      CurriculumAddedEvent.OutputObject
    >;
    CurriculumAdded: TypedContractEvent<
      CurriculumAddedEvent.InputTuple,
      CurriculumAddedEvent.OutputTuple,
      CurriculumAddedEvent.OutputObject
    >;
  };
}
