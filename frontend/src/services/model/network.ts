export type Network = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  addressExplorerUrl: string | null;
  transactionExplorerUrl: string | null;
  multicallAddress: string | null;
  isTestChain: boolean;
  isLocalChain: boolean;
  isDomainNameSupported: boolean;
};

export const HardhatChain: Network = {
  chainId: 31337,
  chainName: "Hardhat",
  nativeCurrency: {
    name: "DegreeToken",
    symbol: "DTK",
    decimals: 18,
  },
  rpcUrls: ["http://127.0.0.1:8545"],
  blockExplorerUrls: [],
  addressExplorerUrl: "",
  transactionExplorerUrl: "",
  multicallAddress: "",
  isTestChain: true,
  isLocalChain: true,
  isDomainNameSupported: false,
};
