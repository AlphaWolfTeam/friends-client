import groupIconsCodes from '../src/utils/images/group-icons/group-icons-base64-codes';

export const config = {
  uri: {
    api_gateway_uri: 'http://localhost:9000',
    auth_service_uri: 'http://localhost:9000',
  },
  roles: {
    member_role_value: 0,
    modifier_role_value: 1,
    manager_role_value: 2,
  },
  length_limitations: {
    min_group_name_length: 2,
    min_tag_length: 2,
    min_user_search_value: 2,
  },
  auth_service_token: 'friends_token',
};

export const groups = [
  {
    name: 'כל דולפין',
    description: 'כללללל דולפין',
    tags: [{ label: 'רמת אביב' }],
    type: 'public',
    users: [
      {
        role: 2,
        id: '5e5688324203fc40043591aa',
      },
      {
        role: 2,
        id: '2222',
      },
      {
        role: 0,
        id: '3333',
      },
      {
        role: 0,
        id: '4444',
      },
      {
        role: 2,
        id: '5555',
      },
      {
        role: 0,
        id: '6666',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '4524216344',
  },
  {
    name: 'סגני דולפין',
    description: 'הסגנים של דולפין',
    tags: [{ label: 'קצונה' }],
    type: 'public',
    users: [
      {
        role: 0,
        id: '5e5688324203fc40043591aa',
      },
      {
        role: 2,
        id: '2222',
      },
      {
        role: 0,
        id: '3333',
      },
      {
        role: 0,
        id: '4444',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '465997590756',
  },
  {
    name: 'סרני דולפין',
    description: 'הסגנים של דולפין',
    tags: [{ label: 'קצונה' }],
    type: 'public',
    users: [
      {
        role: 2,
        id: '5555',
      },
      {
        role: 0,
        id: '6666',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '2678765432',
  },
  {
    name: 'מבצע סודי',
    description: 'קבוצה סודית מאוד',
    tags: [
      { label: 'חיזבאללה' },
      { label: 'סודי ביותר' },
      { label: 'צפון' },
    ],
    type: 'private',
    users: [
      {
        role: 2,
        id: '5e5688324203fc40043591aa',
      },
      {
        role: 0,
        id: '3333',
      },
      {
        role: 2,
        id: '2222',
      },
      {
        role: 0,
        id: '4444',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '2626753788686',
  },
  {
    name: 'חד"כ דולפין',
    description: 'מלא מלא ספורט',
    tags: [],
    type: 'private',
    users: [
      {
        role: 2,
        id: '5e5688324203fc40043591aa',
      },
      {
        role: 0,
        id: '3333',
      },
      {
        role: 0,
        id: '4444',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '9876543214',
  },
  {
    name: 'מנהלי friends',
    description: 'קבוצה סודית מאוד',
    tags: [],
    type: 'private',
    users: [
      {
        role: 0,
        id: '5e5688324203fc40043591aa',
      },
      {
        role: 2,
        id: '2222',
      },
      {
        role: 0,
        id: '3333',
      },
      {
        role: 2,
        id: '4444',
      },
    ],
    lastModified: new Date(),
    createdAt: new Date(),
    modifiedBy: '5e5688324203fc40043591aa',
    exchangeAddress: '',
    externalSystems: {},
    createdBy: '5e5688324203fc40043591aa',
    icon: groupIconsCodes[0],
    _id: '45376568098765',
  },
];

export const users = [{
  id: '5e5688324203fc40043591aa',
  fullName: 'נייקי אדידס',
  name: { firstName: 'נייקי', lastName: 'אדידס' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
{
  id: '3333',
  fullName: 'חיים כהן',
  name: { firstName: 'חיים', lastName: 'כהן' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
{
  id: '2222',
  fullName: 'ישראל ישראלי',
  name: { firstName: 'ישראל', lastName: 'ישראלי' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
{
  id: '4444',
  fullName: 'עומר אדם',
  name: { firstName: 'עומר', lastName: 'אדם' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
{
  id: '5555',
  fullName: 'איציק כהן',
  name: { firstName: 'איציק', lastName: 'כהן' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
{
  id: '6666',
  fullName: 'ישראל אהרוני',
  name: { firstName: 'ישראל', lastName: 'אהרוני' },
  hierarchyFlat: 'היררכיההיררכיההיררכיההיררכיההיררכיההיררכיההיררכיה',
},
];

export const currentUser = {
  address: 'רחוב הממתקים 34',
  adfsId: 't23458789@jello.com',
  currentUnit: 'nitro unit',
  dischargeDay: '2022-11-30T22:00:00.000Z',
  displayName: 't23458789@jello.com',
  entityType: 'digimon',
  exp: 1607005903,
  genesisId: '5e5688324203fc40043591aa',
  iat: 1607002303,
  id: 't23458789@jello.com',
  job: 'רוצח',
  jti: '57c79308-5e5e-4205-8d69-c59025dc70fd',
  name: { firstName: 'נייקי', lastName: 'אדידס' },
  phoneNumbers: ['026666998', '052-1234565'],
  photo: null,
  provider: 'Genesis',
  rank: 'mega',
};
