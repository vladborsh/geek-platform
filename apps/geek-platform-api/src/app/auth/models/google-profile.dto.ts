export interface GoogleProfileDto {
  id: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: {
    value: string;
  }[];
  photos: {
    value: string;
  }[];
  provider: 'google';
}
