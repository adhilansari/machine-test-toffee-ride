
export interface IEmployee {
  id?: number;
  empFirstName: string;
  empLastName: string;
  empGender: 'MALE' | 'FEMALE' | 'OTHER';
  empDateOfBirth: string;
  empDateOfJoining: string;
  empPhoneNumber: string;
  empEmailId: string;
  empHomeAddrLine1: string;
  empHomeAddrLine2: string;
  empHomeAddrStreet: string;
  empHomeAddrDistrict: string;
  empHomeAddrState: string;
  empHomeAddrCountry: string;
  empHomeAddrPinCode: string;
}
