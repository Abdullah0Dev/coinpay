type RootStackParamList = {
  Onboarding: undefined;
  AuthHandling: undefined;
  SignUp: undefined;
  NotFound: undefined;
  SignIn: undefined;
  Home:
    | {
        receiverCountry: string;
        name: string;
        RealPhoneNumber: string;
        address: string;
        purpose: string;
        amount: string;
        date: string;
        transactionID: string;
        TransactionFees: number;
      }
    | undefined;
  FinalizeOnboarding: undefined;
  ConfirmPhone: {phoneNumber: number | string};
  Transactions: undefined;
  SendMoney: undefined;
  AddEmail: {RealPhoneNumber: string; firstName: string; lastName: string};
  AddImageID: {
    RealPhoneNumber: string;
    firstName: string;
    lastName: string; 
    password: string;
  };
  AddAddress: undefined;
  AddPersonalInfo: {RealPhoneNumber: string};
  AddCountry: undefined;
  ReceiveMoney: undefined;
  AccountManagement: undefined;
  Notifications: undefined;
  Welcome: undefined;
  AddCard: undefined;
  VerifyCard: undefined;
  TransactionReceiverCountry: undefined;
  TransactionReceiverName: {receiverCountry: string};
  TransactionReceiverPhone: {receiverCountry: string; name: string};
  TransactionReceiverAddress: {
    receiverCountry: string;
    name: string;
    RealPhoneNumber: string;
  };
  TransactionPurpose: {
    receiverCountry: string;
    name: string;
    RealPhoneNumber: string;
    address: string;
  };
  TransactionAmount: {
    receiverCountry: string;
    name: string;
    RealPhoneNumber: string;
    address: string;
    purpose: string;
  };
  TransactionPaymentProof: {
    receiverCountry: string;
    name: string;
    RealPhoneNumber: string;
    address: string;
    purpose: string;
    amount: string;
    TransactionFees: number;
  };
  PaymentReceipt:
    | {
        receiverCountry: string;
        name: string;
        RealPhoneNumber: string;
        address: string;
        purpose: string;
        amount: string;
        date: string;
        TransactionFees: number;
        transactionID: string;
      }
    | undefined;
  CardSetup: undefined;
  CardList: undefined;
  Support: undefined;
  TransactionDetails:
    | {
        receiverCountry: string;
        name: string;
        RealPhoneNumber: string;
        address: string;
        purpose: string;
        amount: string;
        date: string;
        transactionID: string;
        paymentProof: string;
        status: string;
        color: string;
        icon: string;
        TransactionFees: number;
      }
    | undefined;
};

type RootTabParamList = {
  HomeTab: {
    receiverCountry: string;
    name: string;
    RealPhoneNumber: string;
    address: string;
    purpose: string;
    amount: string;
    date: string;
    TransactionFees: number;
    transactionID: string;
  };
  TransactionsTab: undefined;
  SendMoneyTab: undefined;
  ReceiveMoneyTab: undefined;
  Support: undefined;
  AccountTab: undefined;
};

export type {RootStackParamList, RootTabParamList};
