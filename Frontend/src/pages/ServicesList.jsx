const mockServicesByCategory = {
  identity: [
    {
      id: 'aadhar-update',
      name: 'Update Aadhaar Details',
      description: 'Change address, name, or biometrics.',
      fee: 'Free',
      time: '3 days'
    },
    {id: 'pan-card', name: 'Apply for PAN Card', description: 'New PAN card application.', fee: '₹100', time: '7 days'},
    {id: 'voter-id', name: 'Voter ID Registration', description: 'Register as a voter.', fee: 'Free', time: '14 days'},
    {
      id: 'passport-apply',
      name: 'Apply for Passport',
      description: 'Apply for a new passport.',
      fee: '₹1500',
      time: '21 days'
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      description: 'Apply for birth certificate.',
      fee: '₹50',
      time: '5 days'
    },
    {
      id: 'digilocker',
      name: 'DigiLocker Account',
      description: 'Access digital government documents.',
      fee: 'Free',
      time: 'Instant'
    },
  ],

  health: [
    {
      id: 'ayushman-card',
      name: 'Ayushman Bharat Card',
      description: 'Health insurance for eligible families.',
      fee: 'Free',
      time: '5 days'
    },
    {
      id: 'covid-vaccine',
      name: 'COVID-19 Vaccination Certificate',
      description: 'Download vaccination certificate.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'health-id',
      name: 'ABHA Health ID',
      description: 'Create your digital health ID.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'hospital-appointment',
      name: 'Government Hospital Appointment',
      description: 'Book appointment in govt hospitals.',
      fee: 'Free',
      time: '1 day'
    },
    {
      id: 'medicine-subsidy',
      name: 'Jan Aushadhi Medicine',
      description: 'Access affordable medicines.',
      fee: 'Low cost',
      time: 'Instant'
    },
  ],

  education: [
    {
      id: 'scholarship',
      name: 'Education Scholarship',
      description: 'Apply for government scholarships.',
      fee: 'Free',
      time: '30 days'
    },
    {
      id: 'student-loan',
      name: 'Student Loan Application',
      description: 'Apply for government student loan schemes.',
      fee: 'Free',
      time: '15 days'
    },
    {
      id: 'exam-registration',
      name: 'Government Exam Registration',
      description: 'Register for national exams.',
      fee: '₹500',
      time: '7 days'
    },
    {
      id: 'digital-certificate',
      name: 'Digital Academic Certificate',
      description: 'Download certificates from DigiLocker.',
      fee: 'Free',
      time: 'Instant'
    },
  ],

  tax: [
    {
      id: 'gst-registration',
      name: 'GST Registration',
      description: 'Register for Goods and Services Tax.',
      fee: 'Free',
      time: '7 days'
    },
    {
      id: 'income-tax-filing',
      name: 'Income Tax Return Filing',
      description: 'File your income tax return.',
      fee: 'Free',
      time: '1 day'
    },
    {
      id: 'tan-application',
      name: 'Apply for TAN',
      description: 'Tax Deduction Account Number application.',
      fee: '₹65',
      time: '7 days'
    },
    {
      id: 'business-registration',
      name: 'Startup Registration',
      description: 'Register your startup with govt.',
      fee: 'Free',
      time: '10 days'
    },
  ],

  transport: [
    {
      id: 'driving-license',
      name: 'Driving License',
      description: 'Apply for learner’s or permanent license.',
      fee: '₹500',
      time: '21 days'
    },
    {
      id: 'vehicle-registration',
      name: 'Vehicle Registration',
      description: 'Register your new vehicle.',
      fee: '₹600',
      time: '10 days'
    },
    {
      id: 'rc-download',
      name: 'Download RC',
      description: 'Download your vehicle registration certificate.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'traffic-challan',
      name: 'Pay Traffic Challan',
      description: 'Pay pending traffic fines.',
      fee: 'Varies',
      time: 'Instant'
    },
    {id: 'fastag', name: 'FASTag Services', description: 'Apply or recharge FASTag.', fee: '₹100', time: 'Instant'},
  ],

  social: [
    {
      id: 'pension',
      name: 'Old Age Pension',
      description: 'Apply for social security pension.',
      fee: 'Free',
      time: '15 days'
    },
    {
      id: 'widow-pension',
      name: 'Widow Pension',
      description: 'Financial support for widows.',
      fee: 'Free',
      time: '20 days'
    },
    {
      id: 'disability-support',
      name: 'Disability Support Scheme',
      description: 'Apply for disability assistance.',
      fee: 'Free',
      time: '20 days'
    },
    {
      id: 'gas-subsidy',
      name: 'LPG Gas Subsidy',
      description: 'Apply for PM Ujjwala subsidy.',
      fee: 'Free',
      time: '7 days'
    },
    {
      id: 'jan-dhan',
      name: 'Jan Dhan Bank Account',
      description: 'Open zero-balance bank account.',
      fee: 'Free',
      time: '5 days'
    },
  ],

  agriculture: [
    {
      id: 'pm-kisan',
      name: 'PM Kisan Scheme',
      description: 'Financial support scheme for farmers.',
      fee: 'Free',
      time: '15 days'
    },
    {
      id: 'crop-insurance',
      name: 'Crop Insurance (PMFBY)',
      description: 'Apply for crop insurance coverage.',
      fee: 'Varies',
      time: '7 days'
    },
    {
      id: 'soil-health',
      name: 'Soil Health Card',
      description: 'Check soil health and fertilizer recommendations.',
      fee: 'Free',
      time: '10 days'
    },
    {
      id: 'enam',
      name: 'eNAM Market Access',
      description: 'Online agriculture market for farmers.',
      fee: 'Free',
      time: 'Instant'
    },
  ],

  employment: [
    {
      id: 'ncs-registration',
      name: 'National Career Service',
      description: 'Register for government job assistance.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'epfo-balance',
      name: 'EPFO Balance Check',
      description: 'Check provident fund balance.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'skill-india',
      name: 'Skill India Training',
      description: 'Apply for government skill training.',
      fee: 'Free',
      time: '7 days'
    },
    {
      id: 'esic-services',
      name: 'ESIC Employee Services',
      description: 'Access employee state insurance benefits.',
      fee: 'Free',
      time: 'Instant'
    },
  ],

  housing: [
    {
      id: 'pm-awas',
      name: 'PM Awas Yojana',
      description: 'Apply for government housing scheme.',
      fee: 'Free',
      time: '30 days'
    },
    {
      id: 'property-registration',
      name: 'Property Registration',
      description: 'Register property documents online.',
      fee: 'Varies',
      time: '7 days'
    },
    {
      id: 'land-records',
      name: 'Land Records Check',
      description: 'View land ownership records.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'property-tax',
      name: 'Property Tax Payment',
      description: 'Pay municipal property taxes.',
      fee: 'Varies',
      time: 'Instant'
    },
  ],

  police: [
    {
      id: 'online-fir',
      name: 'Online FIR Filing',
      description: 'File FIR online for non-emergency cases.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'police-verification',
      name: 'Police Verification',
      description: 'Apply for police verification certificate.',
      fee: '₹500',
      time: '7 days'
    },
    {
      id: 'lost-document',
      name: 'Lost Document Report',
      description: 'Report lost documents online.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'cyber-complaint',
      name: 'Cyber Crime Complaint',
      description: 'Report online financial or cyber crimes.',
      fee: 'Free',
      time: 'Instant'
    },
  ],

  courts: [
    {
      id: 'ecourts-case-status',
      name: 'eCourts Case Status',
      description: 'Check court case status online.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'court-judgement',
      name: 'Court Judgement Search',
      description: 'Search court judgements online.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'legal-aid',
      name: 'Free Legal Aid',
      description: 'Apply for free legal assistance.',
      fee: 'Free',
      time: '7 days'
    },
  ],

  utilities: [
    {
      id: 'electricity-bill',
      name: 'Electricity Bill Payment',
      description: 'Pay electricity bills online.',
      fee: 'Varies',
      time: 'Instant'
    },
    {
      id: 'water-bill',
      name: 'Water Bill Payment',
      description: 'Pay water supply bills.',
      fee: 'Varies',
      time: 'Instant'
    },
    {
      id: 'gas-booking',
      name: 'LPG Gas Booking',
      description: 'Book or refill LPG cylinder.',
      fee: 'Varies',
      time: 'Instant'
    },
    {
      id: 'bharat-billpay',
      name: 'Bharat BillPay',
      description: 'Unified bill payment system.',
      fee: 'Varies',
      time: 'Instant'
    },
  ],

  tourism: [
    {
      id: 'incredible-india',
      name: 'Incredible India Tourism',
      description: 'Explore Indian tourism destinations.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'monument-tickets',
      name: 'ASI Monument Tickets',
      description: 'Book tickets for monuments.',
      fee: 'Varies',
      time: 'Instant'
    },
    {
      id: 'irctc-tourism',
      name: 'IRCTC Tourism Packages',
      description: 'Book railway tourism packages.',
      fee: 'Varies',
      time: 'Instant'
    },
  ],

  environment: [
    {
      id: 'pollution-complaint',
      name: 'Pollution Complaint',
      description: 'Report environmental pollution.',
      fee: 'Free',
      time: '3 days'
    },
    {
      id: 'forest-permission',
      name: 'Forest Permit',
      description: 'Apply for forest-related permissions.',
      fee: 'Varies',
      time: '10 days'
    },
    {
      id: 'wildlife-complaint',
      name: 'Wildlife Protection Complaint',
      description: 'Report wildlife violations.',
      fee: 'Free',
      time: '3 days'
    },
  ],

  digital: [
    {
      id: 'umang-services',
      name: 'UMANG Services',
      description: 'Access multiple government services.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'digilocker-access',
      name: 'DigiLocker Access',
      description: 'Access government documents digitally.',
      fee: 'Free',
      time: 'Instant'
    },
    {
      id: 'csc-services',
      name: 'CSC Digital Services',
      description: 'Common service center citizen services.',
      fee: 'Varies',
      time: 'Instant'
    },
  ],

  emergency: [
    {
      id: 'police-helpline',
      name: 'Police Emergency',
      description: 'Emergency police assistance.',
      fee: 'Free',
      time: 'Immediate'
    },
    {
      id: 'ambulance',
      name: 'Ambulance Service',
      description: 'Emergency medical transport.',
      fee: 'Free',
      time: 'Immediate'
    },
    {
      id: 'fire-service',
      name: 'Fire Emergency',
      description: 'Report fire emergencies.',
      fee: 'Free',
      time: 'Immediate'
    },
    {
      id: 'women-helpline',
      name: 'Women Helpline',
      description: 'Emergency support for women.',
      fee: 'Free',
      time: 'Immediate'
    },
  ]

};
