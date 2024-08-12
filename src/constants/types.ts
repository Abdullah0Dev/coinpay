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
    email: string;
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
        transactionID: string;
      }
    | undefined;
  CardSetup: undefined;
  CardList: undefined;
  Support: undefined;
  TransactionDetails: undefined;
};

type RootTabParamList = {
  HomeTab: undefined;
  TransactionsTab: undefined;
  SendMoneyTab: undefined;
  ReceiveMoneyTab: undefined;
  Support: undefined;
  AccountTab: undefined;
};

export type {RootStackParamList, RootTabParamList};
