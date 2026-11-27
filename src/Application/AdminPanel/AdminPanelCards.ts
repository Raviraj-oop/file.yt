export interface MockData {
      title: string;
      content: string;
      subContent: string;
    }

const AdminPanelCards: MockData[] = [
    {
      title: 'Vendor',
      content: 'Active Vendors, Inactive Vendors, Verified Vendors, Unverified Vendors ',
      subContent: `Name, Mobile No, Aadhar Card, Active, Verified`
    },
    // {
    //   title: 'Customer',
    //   content: 'Customer, Active Customer, Inactive Customer, Refund, Pending Refund',
    //   subContent: `Name,Date, Mobile No, Ride Details, Price, Active, Refund, Process`
    //   },
    // Add more mock data objects as needed
  ];

  export default AdminPanelCards;