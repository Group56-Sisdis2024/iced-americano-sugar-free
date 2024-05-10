/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  UniversityContract,
  UniversityContractInterface,
} from "../../contracts/UniversityContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pddikti",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "mandatoriesForCurriculum",
        type: "uint256[]",
      },
    ],
    name: "addACourse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "major",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "minimumCredits",
        type: "uint256",
      },
    ],
    name: "addACurriculum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "npm",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "accumulatedCredit",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "curriculumId",
        type: "uint256",
      },
    ],
    name: "addAStudent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "studentId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "semester",
        type: "string",
      },
      {
        internalType: "string",
        name: "status",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "passedCoursesId",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "takenCoursesId",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "takenCoursesGrade",
        type: "uint256[]",
      },
    ],
    name: "addAnAcademicRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "addressToStudents",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "courses",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "credits",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "coursesId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "curriculumToMandatoryCourses",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "curriculums",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "major",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "minimumCredits",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "curriculumsId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "studentId",
        type: "uint256",
      },
    ],
    name: "getStudentInformation",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "_address",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "npm",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "accumulatedCredits",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "grantedDegreeId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "curriculumId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCreditsTaken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "weightedTotalGrade",
            type: "uint256",
          },
        ],
        internalType: "struct Library.Student",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "string",
            name: "semester",
            type: "string",
          },
          {
            internalType: "string",
            name: "status",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalCreditsPassed",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "passedCoursesId",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "takenCoursesId",
            type: "uint256[]",
          },
          {
            internalType: "uint256[]",
            name: "takenCoursesGrade",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "totalCreditsTaken",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "weightedTotalGrade",
            type: "uint256",
          },
        ],
        internalType: "struct Library.AcademicRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "uniAdress",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "students",
    outputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "npm",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "accumulatedCredits",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "grantedDegreeId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "curriculumId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalCreditsTaken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weightedTotalGrade",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "studentsId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "curriculumId",
        type: "uint256",
      },
    ],
    name: "toggleCurriculum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620034663803806200346683398181016040528101906200003791906200032f565b60405180606001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200160011515815250600160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019081620000cb9190620005e0565b5060408201518160020160006101000a81548160ff021916908315150217905550905050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620006c7565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000178826200014b565b9050919050565b6200018a816200016b565b81146200019657600080fd5b50565b600081519050620001aa816200017f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200020582620001ba565b810181811067ffffffffffffffff82111715620002275762000226620001cb565b5b80604052505050565b60006200023c62000137565b90506200024a8282620001fa565b919050565b600067ffffffffffffffff8211156200026d576200026c620001cb565b5b6200027882620001ba565b9050602081019050919050565b60005b83811015620002a557808201518184015260208101905062000288565b60008484015250505050565b6000620002c8620002c2846200024f565b62000230565b905082815260208101848484011115620002e757620002e6620001b5565b5b620002f484828562000285565b509392505050565b600082601f830112620003145762000313620001b0565b5b815162000326848260208601620002b1565b91505092915050565b6000806040838503121562000349576200034862000141565b5b6000620003598582860162000199565b925050602083015167ffffffffffffffff8111156200037d576200037c62000146565b5b6200038b85828601620002fc565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620003e857607f821691505b602082108103620003fe57620003fd620003a0565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620004687fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000429565b62000474868362000429565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004c1620004bb620004b5846200048c565b62000496565b6200048c565b9050919050565b6000819050919050565b620004dd83620004a0565b620004f5620004ec82620004c8565b84845462000436565b825550505050565b600090565b6200050c620004fd565b62000519818484620004d2565b505050565b5b8181101562000541576200053560008262000502565b6001810190506200051f565b5050565b601f82111562000590576200055a8162000404565b620005658462000419565b8101602085101562000575578190505b6200058d620005848562000419565b8301826200051e565b50505b505050565b600082821c905092915050565b6000620005b56000198460080262000595565b1980831691505092915050565b6000620005d08383620005a2565b9150826002028217905092915050565b620005eb8262000395565b67ffffffffffffffff811115620006075762000606620001cb565b5b620006138254620003cf565b6200062082828562000545565b600060209050601f83116001811462000658576000841562000643578287015190505b6200064f8582620005c2565b865550620006bf565b601f198416620006688662000404565b60005b8281101562000692578489015182556001820191506020850194506020810190506200066b565b86831015620006b25784890151620006ae601f891682620005a2565b8355505b6001600288020188555050505b505050505050565b612d8f80620006d76000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635a85ae39116100975780638da5cb5b116100665780638da5cb5b1461029157806396f979d2146102b1578063bea60855146102e3578063f67329e5146102ff576100f5565b80635a85ae391461020957806363583b991461023957806364b0996c14610257578063681131c114610273576100f5565b80633fd6bf1f116100d35780633fd6bf1f1461017f578063435ea1e01461019d57806343853a23146101b957806347380a63146101d5576100f5565b806306ead22e146100fa578063077b269d146101325780630bfbff7714610163575b600080fd5b610114600480360381019061010f9190611c3e565b61032f565b60405161012999989796959493929190611d4b565b60405180910390f35b61014c60048036038101906101479190611c3e565b6104ad565b60405161015a929190612157565b60405180910390f35b61017d60048036038101906101789190611c3e565b61095d565b005b610187610a1d565b604051610194919061218e565b60405180910390f35b6101b760048036038101906101b2919061234c565b610a23565b005b6101d360048036038101906101ce91906124bd565b610c01565b005b6101ef60048036038101906101ea9190611c3e565b610e82565b60405161020095949392919061258b565b60405180910390f35b610223600480360381019061021e91906125ec565b610fd5565b604051610230919061218e565b60405180910390f35b610241610fed565b60405161024e919061218e565b60405180910390f35b610271600480360381019061026c9190612619565b610ff3565b005b61027b61119d565b604051610288919061218e565b60405180910390f35b6102996111a3565b6040516102a8939291906126ae565b60405180910390f35b6102cb60048036038101906102c69190611c3e565b611270565b6040516102da939291906126ec565b60405180910390f35b6102fd60048036038101906102f89190612780565b611322565b005b610319600480360381019061031491906128b1565b61167c565b604051610326919061218e565b60405180910390f35b60086020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101549080600201805461037e90612920565b80601f01602080910402602001604051908101604052809291908181526020018280546103aa90612920565b80156103f75780601f106103cc576101008083540402835291602001916103f7565b820191906000526020600020905b8154815290600101906020018083116103da57829003601f168201915b50505050509080600301805461040c90612920565b80601f016020809104026020016040519081016040528092919081815260200182805461043890612920565b80156104855780601f1061045a57610100808354040283529160200191610485565b820191906000526020600020905b81548152906001019060200180831161046857829003601f168201915b5050505050908060040154908060050154908060060154908060070154908060080154905089565b6104b5611b28565b6060600a5483106104c557600080fd5b60086000848152602001908152602001600020600b600085815260200190815260200160002081604051806101200160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201805461056890612920565b80601f016020809104026020016040519081016040528092919081815260200182805461059490612920565b80156105e15780601f106105b6576101008083540402835291602001916105e1565b820191906000526020600020905b8154815290600101906020018083116105c457829003601f168201915b505050505081526020016003820180546105fa90612920565b80601f016020809104026020016040519081016040528092919081815260200182805461062690612920565b80156106735780601f1061064857610100808354040283529160200191610673565b820191906000526020600020905b81548152906001019060200180831161065657829003601f168201915b5050505050815260200160048201548152602001600582015481526020016006820154815260200160078201548152602001600882015481525050915080805480602002602001604051908101604052809291908181526020016000905b8282101561094e57838290600052602060002090600802016040518061010001604052908160008201805461070590612920565b80601f016020809104026020016040519081016040528092919081815260200182805461073190612920565b801561077e5780601f106107535761010080835404028352916020019161077e565b820191906000526020600020905b81548152906001019060200180831161076157829003601f168201915b5050505050815260200160018201805461079790612920565b80601f01602080910402602001604051908101604052809291908181526020018280546107c390612920565b80156108105780601f106107e557610100808354040283529160200191610810565b820191906000526020600020905b8154815290600101906020018083116107f357829003601f168201915b50505050508152602001600282015481526020016003820180548060200260200160405190810160405280929190818152602001828054801561087257602002820191906000526020600020905b81548152602001906001019080831161085e575b50505050508152602001600482018054806020026020016040519081016040528092919081815260200182805480156108ca57602002820191906000526020600020905b8154815260200190600101908083116108b6575b505050505081526020016005820180548060200260200160405190810160405280929190818152602001828054801561092257602002820191906000526020600020905b81548152602001906001019080831161090e575b5050505050815260200160068201548152602001600782015481525050815260200190600101906106d1565b50505050905091509150915091565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109ba57600080fd5b60055481106109c857600080fd5b6004600082815260200190815260200160002060040160009054906101000a900460ff16156004600083815260200190815260200160002060040160006101000a81548160ff02191690831515021790555050565b60055481565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a8057600080fd5b60005b8151811015610ac7576000828281518110610aa157610aa0612951565b5b602002602001015190506005548110610ab957600080fd5b508080600101915050610a83565b506040518060600160405280600754815260200185858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815260200183815250600660006007548152602001908152602001600020600082015181600001556020820151816001019081610b5d9190612b2c565b506040820151816002015590505060005b8151811015610be0576000828281518110610b8c57610b8b612951565b5b60200260200101519050600d60008281526020019081526020016000206007549080600181540180825580915050600190039060005260206000200160009091909190915055508080600101915050610b6e565b50600160076000828254610bf49190612c2d565b9250508190555050505050565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c5e57600080fd5b6005548110610c6c57600080fd5b6004600082815260200190815260200160002060040160009054906101000a900460ff16610c9957600080fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166374e2ad22866040518263ffffffff1660e01b8152600401610cf29190612c61565b6020604051808303816000875af1158015610d11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d359190612ca8565b610d3e57600080fd5b6040518061012001604052808673ffffffffffffffffffffffffffffffffffffffff168152602001600a5481526020018581526020018481526020018381526020016000815260200182815260200160008152602001600081525060086000600a54815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002019081610e149190612b2c565b506060820151816003019081610e2a9190612b2c565b506080820151816004015560a0820151816005015560c0820151816006015560e0820151816007015561010082015181600801559050506001600a6000828254610e749190612c2d565b925050819055505050505050565b6004602052806000526040600020600091509050806000015490806001018054610eab90612920565b80601f0160208091040260200160405190810160405280929190818152602001828054610ed790612920565b8015610f245780601f10610ef957610100808354040283529160200191610f24565b820191906000526020600020905b815481529060010190602001808311610f0757829003601f168201915b505050505090806002018054610f3990612920565b80601f0160208091040260200160405190810160405280929190818152602001828054610f6590612920565b8015610fb25780601f10610f8757610100808354040283529160200191610fb2565b820191906000526020600020905b815481529060010190602001808311610f9557829003601f168201915b5050505050908060030154908060040160009054906101000a900460ff16905085565b60096020528060005260406000206000915090505481565b60075481565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461105057600080fd5b6040518060a00160405280600554815260200186868080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815260200184848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508152602001828152602001600115158152506004600060055481526020019081526020016000206000820151816000015560208201518160010190816111389190612b2c565b50604082015181600201908161114e9190612b2c565b506060820151816003015560808201518160040160006101000a81548160ff02191690831515021790555090505060016005600082825461118f9190612c2d565b925050819055505050505050565b600a5481565b60018060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010180546111da90612920565b80601f016020809104026020016040519081016040528092919081815260200182805461120690612920565b80156112535780601f1061122857610100808354040283529160200191611253565b820191906000526020600020905b81548152906001019060200180831161123657829003601f168201915b5050505050908060020160009054906101000a900460ff16905083565b600660205280600052604060002060009150905080600001549080600101805461129990612920565b80601f01602080910402602001604051908101604052809291908181526020018280546112c590612920565b80156113125780601f106112e757610100808354040283529160200191611312565b820191906000526020600020905b8154815290600101906020018083116112f557829003601f168201915b5050505050908060020154905083565b600160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461137f57600080fd5b600a548b1061138d57600080fd5b81819050848490501461139f57600080fd5b60005b868690508110156113e1576007548787838181106113c3576113c2612951565b5b90506020020135106113d457600080fd5b80806001019150506113a2565b5060008060006113f68e8a8a8a8a8a8a6116ad565b925092509250600b60008f81526020019081526020016000206040518061010001604052808f8f8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018581526020018b8b80806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050508152602001898980806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050508152602001878780806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050815260200184815260200183815250908060018154018082558091505060019003906000526020600020906008020160009091909190915060008201518160000190816115d29190612b2c565b5060208201518160010190816115e89190612b2c565b5060408201518160020155606082015181600301908051906020019061160f929190611b8a565b50608082015181600401908051906020019061162c929190611b8a565b5060a0820151816005019080519060200190611649929190611b8a565b5060c0820151816006015560e08201518160070155505061166c8e84848461183c565b5050505050505050505050505050565b600d602052816000526040600020818154811061169857600080fd5b90600052602060002001600091509150505481565b6000806000806000905060005b8a8a905081101561176557600660008c8c848181106116dc576116db612951565b5b90506020020135815260200190815260200160002060020154826117009190612c2d565b91506001600c60008e815260200190815260200160002060008d8d8581811061172c5761172b612951565b5b90506020020135815260200190815260200160002060006101000a81548160ff02191690831515021790555080806001019150506116ba565b5060008060005b8a8a905081101561182257600660008c8c8481811061178e5761178d612951565b5b90506020020135815260200190815260200160002060020154826117b29190612c2d565b9150600660008c8c848181106117cb576117ca612951565b5b905060200201358152602001908152602001600020600201548989838181106117f7576117f6612951565b5b905060200201356118089190612cd5565b836118139190612c2d565b9250808060010191505061176c565b508281839550955095505050509750975097945050505050565b826008600086815260200190815260200160002060040160008282546118629190612c2d565b925050819055508160086000868152602001908152602001600020600701600082825461188f9190612c2d565b92505081905550806008600086815260200190815260200160002060080160008282546118bc9190612c2d565b925050819055506118cc846118fb565b156118f5576118da84611a4c565b60086000868152602001908152602001600020600501819055505b50505050565b6000600460006008600085815260200190815260200160002060060154815260200190815260200160002060030154600860008481526020019081526020016000206004015410156119505760009050611a47565b6000600d6000600860008681526020019081526020016000206006015481526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156119c557602002820191906000526020600020905b8154815260200190600101908083116119b1575b5050505050905060005b8151811015611a4057600c60008581526020019081526020016000206000838381518110611a00576119ff612951565b5b6020026020010151815260200190815260200160002060009054906101000a900460ff16611a3357600092505050611a47565b80806001019150506119cf565b5060019150505b919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166357060b096008600085815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518263ffffffff1660e01b8152600401611ade9190612c61565b6020604051808303816000875af1158015611afd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b219190612d2c565b9050919050565b604051806101200160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001606081526020016060815260200160008152602001600081526020016000815260200160008152602001600081525090565b828054828255906000526020600020908101928215611bc6579160200282015b82811115611bc5578251825591602001919060010190611baa565b5b509050611bd39190611bd7565b5090565b5b80821115611bf0576000816000905550600101611bd8565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b611c1b81611c08565b8114611c2657600080fd5b50565b600081359050611c3881611c12565b92915050565b600060208284031215611c5457611c53611bfe565b5b6000611c6284828501611c29565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611c9682611c6b565b9050919050565b611ca681611c8b565b82525050565b611cb581611c08565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611cf5578082015181840152602081019050611cda565b60008484015250505050565b6000601f19601f8301169050919050565b6000611d1d82611cbb565b611d278185611cc6565b9350611d37818560208601611cd7565b611d4081611d01565b840191505092915050565b600061012082019050611d61600083018c611c9d565b611d6e602083018b611cac565b8181036040830152611d80818a611d12565b90508181036060830152611d948189611d12565b9050611da36080830188611cac565b611db060a0830187611cac565b611dbd60c0830186611cac565b611dca60e0830185611cac565b611dd8610100830184611cac565b9a9950505050505050505050565b611def81611c8b565b82525050565b611dfe81611c08565b82525050565b600082825260208201905092915050565b6000611e2082611cbb565b611e2a8185611e04565b9350611e3a818560208601611cd7565b611e4381611d01565b840191505092915050565b600061012083016000830151611e676000860182611de6565b506020830151611e7a6020860182611df5565b5060408301518482036040860152611e928282611e15565b91505060608301518482036060860152611eac8282611e15565b9150506080830151611ec16080860182611df5565b5060a0830151611ed460a0860182611df5565b5060c0830151611ee760c0860182611df5565b5060e0830151611efa60e0860182611df5565b50610100830151611f0f610100860182611df5565b508091505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000611f7e8383611df5565b60208301905092915050565b6000602082019050919050565b6000611fa282611f46565b611fac8185611f51565b9350611fb783611f62565b8060005b83811015611fe8578151611fcf8882611f72565b9750611fda83611f8a565b925050600181019050611fbb565b5085935050505092915050565b60006101008301600083015184820360008601526120138282611e15565b9150506020830151848203602086015261202d8282611e15565b91505060408301516120426040860182611df5565b506060830151848203606086015261205a8282611f97565b915050608083015184820360808601526120748282611f97565b91505060a083015184820360a086015261208e8282611f97565b91505060c08301516120a360c0860182611df5565b5060e08301516120b660e0860182611df5565b508091505092915050565b60006120cd8383611ff5565b905092915050565b6000602082019050919050565b60006120ed82611f1a565b6120f78185611f25565b93508360208202850161210985611f36565b8060005b85811015612145578484038952815161212685826120c1565b9450612131836120d5565b925060208a0199505060018101905061210d565b50829750879550505050505092915050565b600060408201905081810360008301526121718185611e4e565b9050818103602083015261218581846120e2565b90509392505050565b60006020820190506121a36000830184611cac565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f8401126121ce576121cd6121a9565b5b8235905067ffffffffffffffff8111156121eb576121ea6121ae565b5b602083019150836001820283011115612207576122066121b3565b5b9250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61224682611d01565b810181811067ffffffffffffffff821117156122655761226461220e565b5b80604052505050565b6000612278611bf4565b9050612284828261223d565b919050565b600067ffffffffffffffff8211156122a4576122a361220e565b5b602082029050602081019050919050565b60006122c86122c384612289565b61226e565b905080838252602082019050602084028301858111156122eb576122ea6121b3565b5b835b8181101561231457806123008882611c29565b8452602084019350506020810190506122ed565b5050509392505050565b600082601f830112612333576123326121a9565b5b81356123438482602086016122b5565b91505092915050565b6000806000806060858703121561236657612365611bfe565b5b600085013567ffffffffffffffff81111561238457612383611c03565b5b612390878288016121b8565b945094505060206123a387828801611c29565b925050604085013567ffffffffffffffff8111156123c4576123c3611c03565b5b6123d08782880161231e565b91505092959194509250565b6123e581611c8b565b81146123f057600080fd5b50565b600081359050612402816123dc565b92915050565b600080fd5b600067ffffffffffffffff8211156124285761242761220e565b5b61243182611d01565b9050602081019050919050565b82818337600083830152505050565b600061246061245b8461240d565b61226e565b90508281526020810184848401111561247c5761247b612408565b5b61248784828561243e565b509392505050565b600082601f8301126124a4576124a36121a9565b5b81356124b484826020860161244d565b91505092915050565b600080600080600060a086880312156124d9576124d8611bfe565b5b60006124e7888289016123f3565b955050602086013567ffffffffffffffff81111561250857612507611c03565b5b6125148882890161248f565b945050604086013567ffffffffffffffff81111561253557612534611c03565b5b6125418882890161248f565b935050606061255288828901611c29565b925050608061256388828901611c29565b9150509295509295909350565b60008115159050919050565b61258581612570565b82525050565b600060a0820190506125a06000830188611cac565b81810360208301526125b28187611d12565b905081810360408301526125c68186611d12565b90506125d56060830185611cac565b6125e2608083018461257c565b9695505050505050565b60006020828403121561260257612601611bfe565b5b6000612610848285016123f3565b91505092915050565b60008060008060006060868803121561263557612634611bfe565b5b600086013567ffffffffffffffff81111561265357612652611c03565b5b61265f888289016121b8565b9550955050602086013567ffffffffffffffff81111561268257612681611c03565b5b61268e888289016121b8565b935093505060406126a188828901611c29565b9150509295509295909350565b60006060820190506126c36000830186611c9d565b81810360208301526126d58185611d12565b90506126e4604083018461257c565b949350505050565b60006060820190506127016000830186611cac565b81810360208301526127138185611d12565b90506127226040830184611cac565b949350505050565b60008083601f8401126127405761273f6121a9565b5b8235905067ffffffffffffffff81111561275d5761275c6121ae565b5b602083019150836020820283011115612779576127786121b3565b5b9250929050565b600080600080600080600080600080600060c08c8e0312156127a5576127a4611bfe565b5b60006127b38e828f01611c29565b9b505060208c013567ffffffffffffffff8111156127d4576127d3611c03565b5b6127e08e828f016121b8565b9a509a505060408c013567ffffffffffffffff81111561280357612802611c03565b5b61280f8e828f016121b8565b985098505060608c013567ffffffffffffffff81111561283257612831611c03565b5b61283e8e828f0161272a565b965096505060808c013567ffffffffffffffff81111561286157612860611c03565b5b61286d8e828f0161272a565b945094505060a08c013567ffffffffffffffff8111156128905761288f611c03565b5b61289c8e828f0161272a565b92509250509295989b509295989b9093969950565b600080604083850312156128c8576128c7611bfe565b5b60006128d685828601611c29565b92505060206128e785828601611c29565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061293857607f821691505b60208210810361294b5761294a6128f1565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026129e27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826129a5565b6129ec86836129a5565b95508019841693508086168417925050509392505050565b6000819050919050565b6000612a29612a24612a1f84611c08565b612a04565b611c08565b9050919050565b6000819050919050565b612a4383612a0e565b612a57612a4f82612a30565b8484546129b2565b825550505050565b600090565b612a6c612a5f565b612a77818484612a3a565b505050565b5b81811015612a9b57612a90600082612a64565b600181019050612a7d565b5050565b601f821115612ae057612ab181612980565b612aba84612995565b81016020851015612ac9578190505b612add612ad585612995565b830182612a7c565b50505b505050565b600082821c905092915050565b6000612b0360001984600802612ae5565b1980831691505092915050565b6000612b1c8383612af2565b9150826002028217905092915050565b612b3582611cbb565b67ffffffffffffffff811115612b4e57612b4d61220e565b5b612b588254612920565b612b63828285612a9f565b600060209050601f831160018114612b965760008415612b84578287015190505b612b8e8582612b10565b865550612bf6565b601f198416612ba486612980565b60005b82811015612bcc57848901518255600182019150602085019450602081019050612ba7565b86831015612be95784890151612be5601f891682612af2565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612c3882611c08565b9150612c4383611c08565b9250828201905080821115612c5b57612c5a612bfe565b5b92915050565b6000602082019050612c766000830184611c9d565b92915050565b612c8581612570565b8114612c9057600080fd5b50565b600081519050612ca281612c7c565b92915050565b600060208284031215612cbe57612cbd611bfe565b5b6000612ccc84828501612c93565b91505092915050565b6000612ce082611c08565b9150612ceb83611c08565b9250828202612cf981611c08565b91508282048414831517612d1057612d0f612bfe565b5b5092915050565b600081519050612d2681611c12565b92915050565b600060208284031215612d4257612d41611bfe565b5b6000612d5084828501612d17565b9150509291505056fea264697066735822122066f1845225c2e05d8dc715deb0710f359dc1f0eb51dabb18edbc722a1d98317b64736f6c63430008180033";

type UniversityContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniversityContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniversityContract__factory extends ContractFactory {
  constructor(...args: UniversityContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _pddikti: AddressLike,
    name: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_pddikti, name, overrides || {});
  }
  override deploy(
    _pddikti: AddressLike,
    name: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_pddikti, name, overrides || {}) as Promise<
      UniversityContract & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): UniversityContract__factory {
    return super.connect(runner) as UniversityContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniversityContractInterface {
    return new Interface(_abi) as UniversityContractInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UniversityContract {
    return new Contract(address, _abi, runner) as unknown as UniversityContract;
  }
}
