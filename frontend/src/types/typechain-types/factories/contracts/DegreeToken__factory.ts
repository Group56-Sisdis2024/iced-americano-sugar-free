/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  DegreeToken,
  DegreeTokenInterface,
} from "../../contracts/DegreeToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "uniAdress",
        type: "address",
      },
      {
        internalType: "string",
        name: "uniName",
        type: "string",
      },
    ],
    name: "addUniversity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "studentAddress",
        type: "address",
      },
    ],
    name: "mintADegree",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "student",
        type: "address",
      },
    ],
    name: "registerAStudent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
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
    name: "studentsToUniverity",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
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
    name: "universities",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600b81526020017f446567726565546f6b656e0000000000000000000000000000000000000000008152506040518060400160405280600381526020017f44544b000000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000365565b508060019081620000a1919062000365565b50505033600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200044c565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200016d57607f821691505b60208210810362000183576200018262000125565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620001ed7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620001ae565b620001f98683620001ae565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600062000246620002406200023a8462000211565b6200021b565b62000211565b9050919050565b6000819050919050565b620002628362000225565b6200027a62000271826200024d565b848454620001bb565b825550505050565b600090565b6200029162000282565b6200029e81848462000257565b505050565b5b81811015620002c657620002ba60008262000287565b600181019050620002a4565b5050565b601f8211156200031557620002df8162000189565b620002ea846200019e565b81016020851015620002fa578190505b6200031262000309856200019e565b830182620002a3565b50505b505050565b600082821c905092915050565b60006200033a600019846008026200031a565b1980831691505092915050565b600062000355838362000327565b9150826002028217905092915050565b6200037082620000eb565b67ffffffffffffffff8111156200038c576200038b620000f6565b5b62000398825462000154565b620003a5828285620002ca565b600060209050601f831160018114620003dd5760008415620003c8578287015190505b620003d4858262000347565b86555062000444565b601f198416620003ed8662000189565b60005b828110156200041757848901518255600182019150602085019450602081019050620003f0565b8683101562000437578489015162000433601f89168262000327565b8355505b6001600288020188555050505b505050505050565b612843806200045c6000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c806370a08231116100ad578063a908dc6211610071578063a908dc6214610340578063b88d4fde1461035c578063c87b56dd14610378578063e985e9c5146103a8578063f0995560146103d857610121565b806370a082311461028857806374e2ad22146102b85780638da5cb5b146102e857806395d89b4114610306578063a22cb4651461032457610121565b806323b872dd116100f457806323b872dd146101c057806342842e0e146101dc57806357060b09146101f85780636352211e14610228578063664352db1461025857610121565b806301ffc9a71461012657806306fdde0314610156578063081812fc14610174578063095ea7b3146101a4575b600080fd5b610140600480360381019061013b9190611c71565b61040a565b60405161014d9190611cb9565b60405180910390f35b61015e6104ec565b60405161016b9190611d64565b60405180910390f35b61018e60048036038101906101899190611dbc565b61057e565b60405161019b9190611e2a565b60405180910390f35b6101be60048036038101906101b99190611e71565b61059a565b005b6101da60048036038101906101d59190611eb1565b6105b0565b005b6101f660048036038101906101f19190611eb1565b6106b2565b005b610212600480360381019061020d9190611f04565b6106d2565b60405161021f9190611f40565b60405180910390f35b610242600480360381019061023d9190611dbc565b6107f4565b60405161024f9190611e2a565b60405180910390f35b610272600480360381019061026d9190611f04565b610806565b60405161027f9190611e2a565b60405180910390f35b6102a2600480360381019061029d9190611f04565b610839565b6040516102af9190611f40565b60405180910390f35b6102d260048036038101906102cd9190611f04565b6108f3565b6040516102df9190611cb9565b60405180910390f35b6102f0610a72565b6040516102fd9190611e2a565b60405180910390f35b61030e610a98565b60405161031b9190611d64565b60405180910390f35b61033e60048036038101906103399190611f87565b610b2a565b005b61035a600480360381019061035591906120fc565b610b40565b005b610376600480360381019061037191906121f9565b610c91565b005b610392600480360381019061038d9190611dbc565b610cae565b60405161039f9190611d64565b60405180910390f35b6103c260048036038101906103bd919061227c565b610d17565b6040516103cf9190611cb9565b60405180910390f35b6103f260048036038101906103ed9190611f04565b610dab565b604051610401939291906122bc565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104d557507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806104e557506104e482610e8a565b5b9050919050565b6060600080546104fb90612329565b80601f016020809104026020016040519081016040528092919081815260200182805461052790612329565b80156105745780601f1061054957610100808354040283529160200191610574565b820191906000526020600020905b81548152906001019060200180831161055757829003601f168201915b5050505050905090565b600061058982610ef4565b5061059382610f7c565b9050919050565b6105ac82826105a7610fb9565b610fc1565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036106225760006040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016106199190611e2a565b60405180910390fd5b60006106368383610631610fb9565b610fd3565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106ac578382826040517f64283d7b0000000000000000000000000000000000000000000000000000000081526004016106a39392919061235a565b60405180910390fd5b50505050565b6106cd83838360405180602001604052806000815250610c91565b505050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1661072d57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff16600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146107c457600080fd5b6001600860008282546107d791906123c0565b925050819055506107ea826008546111ed565b6008549050919050565b60006107ff82610ef4565b9050919050565b60076020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108ac5760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016108a39190611e2a565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1661094e57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff16600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109ea5760009050610a6d565b33600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190505b919050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060018054610aa790612329565b80601f0160208091040260200160405190810160405280929190818152602001828054610ad390612329565b8015610b205780601f10610af557610100808354040283529160200191610b20565b820191906000526020600020905b815481529060010190602001808311610b0357829003601f168201915b5050505050905090565b610b3c610b35610fb9565b838361120b565b5050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b9a57600080fd5b60405180606001604052808373ffffffffffffffffffffffffffffffffffffffff16815260200182815260200160011515815250600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001019081610c6991906125a0565b5060408201518160020160006101000a81548160ff0219169083151502179055509050505050565b610c9c8484846105b0565b610ca88484848461137a565b50505050565b6060610cb982610ef4565b506000610cc4611531565b90506000815111610ce45760405180602001604052806000815250610d0f565b80610cee84611548565b604051602001610cff9291906126ae565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60066020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054610df490612329565b80601f0160208091040260200160405190810160405280929190818152602001828054610e2090612329565b8015610e6d5780601f10610e4257610100808354040283529160200191610e6d565b820191906000526020600020905b815481529060010190602001808311610e5057829003601f168201915b5050505050908060020160009054906101000a900460ff16905083565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080610f0083611616565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610f7357826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610f6a9190611f40565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610fce8383836001611653565b505050565b600080610fdf84611616565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161461102157611020818486611818565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146110b257611063600085600080611653565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614611135576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6112078282604051806020016040528060008152506118dc565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361127c57816040517f5b08ba180000000000000000000000000000000000000000000000000000000081526004016112739190611e2a565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161136d9190611cb9565b60405180910390a3505050565b60008373ffffffffffffffffffffffffffffffffffffffff163b111561152b578273ffffffffffffffffffffffffffffffffffffffff1663150b7a026113be610fb9565b8685856040518563ffffffff1660e01b81526004016113e09493929190612727565b6020604051808303816000875af192505050801561141c57506040513d601f19601f820116820180604052508101906114199190612788565b60015b6114a0573d806000811461144c576040519150601f19603f3d011682016040523d82523d6000602084013e611451565b606091505b50600081510361149857836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161148f9190611e2a565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461152957836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016115209190611e2a565b60405180910390fd5b505b50505050565b606060405180602001604052806000815250905090565b606060006001611557846118f8565b01905060008167ffffffffffffffff81111561157657611575611fd1565b5b6040519080825280601f01601f1916602001820160405280156115a85781602001600182028036833780820191505090505b509050600082602001820190505b60011561160b578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816115ff576115fe6127b5565b5b049450600085036115b6575b819350505050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b808061168c5750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156117c057600061169c84610ef4565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561170757508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b801561171a57506117188184610d17565b155b1561175c57826040517fa9fbf51f0000000000000000000000000000000000000000000000000000000081526004016117539190611e2a565b60405180910390fd5b81156117be57838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b611823838383611a4b565b6118d757600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361189857806040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161188f9190611f40565b60405180910390fd5b81816040517f177e802f0000000000000000000000000000000000000000000000000000000081526004016118ce9291906127e4565b60405180910390fd5b505050565b6118e68383611b0c565b6118f3600084848461137a565b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611956577a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000838161194c5761194b6127b5565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611993576d04ee2d6d415b85acef81000000008381611989576119886127b5565b5b0492506020810190505b662386f26fc1000083106119c257662386f26fc1000083816119b8576119b76127b5565b5b0492506010810190505b6305f5e10083106119eb576305f5e10083816119e1576119e06127b5565b5b0492506008810190505b6127108310611a10576127108381611a0657611a056127b5565b5b0492506004810190505b60648310611a335760648381611a2957611a286127b5565b5b0492506002810190505b600a8310611a42576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015611b0357508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480611ac45750611ac38484610d17565b5b80611b0257508273ffffffffffffffffffffffffffffffffffffffff16611aea83610f7c565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611b7e5760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401611b759190611e2a565b60405180910390fd5b6000611b8c83836000610fd3565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611c005760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401611bf79190611e2a565b60405180910390fd5b505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611c4e81611c19565b8114611c5957600080fd5b50565b600081359050611c6b81611c45565b92915050565b600060208284031215611c8757611c86611c0f565b5b6000611c9584828501611c5c565b91505092915050565b60008115159050919050565b611cb381611c9e565b82525050565b6000602082019050611cce6000830184611caa565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d0e578082015181840152602081019050611cf3565b60008484015250505050565b6000601f19601f8301169050919050565b6000611d3682611cd4565b611d408185611cdf565b9350611d50818560208601611cf0565b611d5981611d1a565b840191505092915050565b60006020820190508181036000830152611d7e8184611d2b565b905092915050565b6000819050919050565b611d9981611d86565b8114611da457600080fd5b50565b600081359050611db681611d90565b92915050565b600060208284031215611dd257611dd1611c0f565b5b6000611de084828501611da7565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611e1482611de9565b9050919050565b611e2481611e09565b82525050565b6000602082019050611e3f6000830184611e1b565b92915050565b611e4e81611e09565b8114611e5957600080fd5b50565b600081359050611e6b81611e45565b92915050565b60008060408385031215611e8857611e87611c0f565b5b6000611e9685828601611e5c565b9250506020611ea785828601611da7565b9150509250929050565b600080600060608486031215611eca57611ec9611c0f565b5b6000611ed886828701611e5c565b9350506020611ee986828701611e5c565b9250506040611efa86828701611da7565b9150509250925092565b600060208284031215611f1a57611f19611c0f565b5b6000611f2884828501611e5c565b91505092915050565b611f3a81611d86565b82525050565b6000602082019050611f556000830184611f31565b92915050565b611f6481611c9e565b8114611f6f57600080fd5b50565b600081359050611f8181611f5b565b92915050565b60008060408385031215611f9e57611f9d611c0f565b5b6000611fac85828601611e5c565b9250506020611fbd85828601611f72565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61200982611d1a565b810181811067ffffffffffffffff8211171561202857612027611fd1565b5b80604052505050565b600061203b611c05565b90506120478282612000565b919050565b600067ffffffffffffffff82111561206757612066611fd1565b5b61207082611d1a565b9050602081019050919050565b82818337600083830152505050565b600061209f61209a8461204c565b612031565b9050828152602081018484840111156120bb576120ba611fcc565b5b6120c684828561207d565b509392505050565b600082601f8301126120e3576120e2611fc7565b5b81356120f384826020860161208c565b91505092915050565b6000806040838503121561211357612112611c0f565b5b600061212185828601611e5c565b925050602083013567ffffffffffffffff81111561214257612141611c14565b5b61214e858286016120ce565b9150509250929050565b600067ffffffffffffffff82111561217357612172611fd1565b5b61217c82611d1a565b9050602081019050919050565b600061219c61219784612158565b612031565b9050828152602081018484840111156121b8576121b7611fcc565b5b6121c384828561207d565b509392505050565b600082601f8301126121e0576121df611fc7565b5b81356121f0848260208601612189565b91505092915050565b6000806000806080858703121561221357612212611c0f565b5b600061222187828801611e5c565b945050602061223287828801611e5c565b935050604061224387828801611da7565b925050606085013567ffffffffffffffff81111561226457612263611c14565b5b612270878288016121cb565b91505092959194509250565b6000806040838503121561229357612292611c0f565b5b60006122a185828601611e5c565b92505060206122b285828601611e5c565b9150509250929050565b60006060820190506122d16000830186611e1b565b81810360208301526122e38185611d2b565b90506122f26040830184611caa565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061234157607f821691505b602082108103612354576123536122fa565b5b50919050565b600060608201905061236f6000830186611e1b565b61237c6020830185611f31565b6123896040830184611e1b565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006123cb82611d86565b91506123d683611d86565b92508282019050808211156123ee576123ed612391565b5b92915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026124567fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612419565b6124608683612419565b95508019841693508086168417925050509392505050565b6000819050919050565b600061249d61249861249384611d86565b612478565b611d86565b9050919050565b6000819050919050565b6124b783612482565b6124cb6124c3826124a4565b848454612426565b825550505050565b600090565b6124e06124d3565b6124eb8184846124ae565b505050565b5b8181101561250f576125046000826124d8565b6001810190506124f1565b5050565b601f82111561255457612525816123f4565b61252e84612409565b8101602085101561253d578190505b61255161254985612409565b8301826124f0565b50505b505050565b600082821c905092915050565b600061257760001984600802612559565b1980831691505092915050565b60006125908383612566565b9150826002028217905092915050565b6125a982611cd4565b67ffffffffffffffff8111156125c2576125c1611fd1565b5b6125cc8254612329565b6125d7828285612513565b600060209050601f83116001811461260a57600084156125f8578287015190505b6126028582612584565b86555061266a565b601f198416612618866123f4565b60005b828110156126405784890151825560018201915060208501945060208101905061261b565b8683101561265d5784890151612659601f891682612566565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b600061268882611cd4565b6126928185612672565b93506126a2818560208601611cf0565b80840191505092915050565b60006126ba828561267d565b91506126c6828461267d565b91508190509392505050565b600081519050919050565b600082825260208201905092915050565b60006126f9826126d2565b61270381856126dd565b9350612713818560208601611cf0565b61271c81611d1a565b840191505092915050565b600060808201905061273c6000830187611e1b565b6127496020830186611e1b565b6127566040830185611f31565b818103606083015261276881846126ee565b905095945050505050565b60008151905061278281611c45565b92915050565b60006020828403121561279e5761279d611c0f565b5b60006127ac84828501612773565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006040820190506127f96000830185611e1b565b6128066020830184611f31565b939250505056fea2646970667358221220045a524b55e0a4f2b9ec9015394c8f22ef26824c3d1e7615784e1b0feaed3cb164736f6c63430008180033";

type DegreeTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DegreeTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DegreeToken__factory extends ContractFactory {
  constructor(...args: DegreeTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      DegreeToken & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): DegreeToken__factory {
    return super.connect(runner) as DegreeToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DegreeTokenInterface {
    return new Interface(_abi) as DegreeTokenInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): DegreeToken {
    return new Contract(address, _abi, runner) as unknown as DegreeToken;
  }
}