type RootStackParamList = {
  Onboarding: undefined;
  AuthHandling: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
  FinalizeOnboarding: undefined;
  ConfirmPhone: {phoneNumber: number | string};
  Transactions: undefined;
  SendMoney: undefined;
  AddEmail: undefined;
  AddImageID: undefined;
  AddAddress: undefined;
  AddPersonalInfo: undefined;
  AddCountry: undefined;
  ReceiveMoney: undefined;
  AccountManagement: undefined;
  Notifications: undefined;
  Welcome: undefined;
  AddCard: undefined;
  VerifyCard: undefined;
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
  AccountTab: undefined;
};

export type {RootStackParamList, RootTabParamList};
