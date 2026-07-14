export interface Country {
    code: string;
    name: string;
    states: State[];
}

export interface State {
    code: string;
    name: string;
}

export const COUNTRIES_WITH_STATES: Country[] = [
    {
        code: "US",
        name: "United States",
        states: [
            { code: "AL", name: "Alabama" },
            { code: "AK", name: "Alaska" },
            { code: "AZ", name: "Arizona" },
            { code: "AR", name: "Arkansas" },
            { code: "CA", name: "California" },
            { code: "CO", name: "Colorado" },
            { code: "CT", name: "Connecticut" },
            { code: "DE", name: "Delaware" },
            { code: "FL", name: "Florida" },
            { code: "GA", name: "Georgia" },
            { code: "HI", name: "Hawaii" },
            { code: "ID", name: "Idaho" },
            { code: "IL", name: "Illinois" },
            { code: "IN", name: "Indiana" },
            { code: "IA", name: "Iowa" },
            { code: "KS", name: "Kansas" },
            { code: "KY", name: "Kentucky" },
            { code: "LA", name: "Louisiana" },
            { code: "ME", name: "Maine" },
            { code: "MD", name: "Maryland" },
            { code: "MA", name: "Massachusetts" },
            { code: "MI", name: "Michigan" },
            { code: "MN", name: "Minnesota" },
            { code: "MS", name: "Mississippi" },
            { code: "MO", name: "Missouri" },
            { code: "MT", name: "Montana" },
            { code: "NE", name: "Nebraska" },
            { code: "NV", name: "Nevada" },
            { code: "NH", name: "New Hampshire" },
            { code: "NJ", name: "New Jersey" },
            { code: "NM", name: "New Mexico" },
            { code: "NY", name: "New York" },
            { code: "NC", name: "North Carolina" },
            { code: "ND", name: "North Dakota" },
            { code: "OH", name: "Ohio" },
            { code: "OK", name: "Oklahoma" },
            { code: "OR", name: "Oregon" },
            { code: "PA", name: "Pennsylvania" },
            { code: "RI", name: "Rhode Island" },
            { code: "SC", name: "South Carolina" },
            { code: "SD", name: "South Dakota" },
            { code: "TN", name: "Tennessee" },
            { code: "TX", name: "Texas" },
            { code: "UT", name: "Utah" },
            { code: "VT", name: "Vermont" },
            { code: "VA", name: "Virginia" },
            { code: "WA", name: "Washington" },
            { code: "WV", name: "West Virginia" },
            { code: "WI", name: "Wisconsin" },
            { code: "WY", name: "Wyoming" },
        ]
    },
    {
        code: "CA",
        name: "Canada",
        states: [
            { code: "AB", name: "Alberta" },
            { code: "BC", name: "British Columbia" },
            { code: "MB", name: "Manitoba" },
            { code: "NB", name: "New Brunswick" },
            { code: "NL", name: "Newfoundland and Labrador" },
            { code: "NS", name: "Nova Scotia" },
            { code: "ON", name: "Ontario" },
            { code: "PE", name: "Prince Edward Island" },
            { code: "QC", name: "Quebec" },
            { code: "SK", name: "Saskatchewan" },
            { code: "NT", name: "Northwest Territories" },
            { code: "NU", name: "Nunavut" },
            { code: "YT", name: "Yukon" },
        ]
    },
    {
        code: "IN",
        name: "India",
        states: [
            { code: "AN", name: "Andaman and Nicobar Islands" },
            { code: "AP", name: "Andhra Pradesh" },
            { code: "AR", name: "Arunachal Pradesh" },
            { code: "AS", name: "Assam" },
            { code: "BR", name: "Bihar" },
            { code: "CG", name: "Chhattisgarh" },
            { code: "CH", name: "Chandigarh" },
            { code: "DH", name: "Dadra and Nagar Haveli" },
            { code: "DD", name: "Daman and Diu" },
            { code: "DL", name: "Delhi" },
            { code: "GA", name: "Goa" },
            { code: "GJ", name: "Gujarat" },
            { code: "HR", name: "Haryana" },
            { code: "HP", name: "Himachal Pradesh" },
            { code: "JK", name: "Jammu and Kashmir" },
            { code: "JH", name: "Jharkhand" },
            { code: "KA", name: "Karnataka" },
            { code: "KL", name: "Kerala" },
            { code: "LA", name: "Ladakh" },
            { code: "LD", name: "Lakshadweep" },
            { code: "MP", name: "Madhya Pradesh" },
            { code: "MH", name: "Maharashtra" },
            { code: "MN", name: "Manipur" },
            { code: "ML", name: "Meghalaya" },
            { code: "MZ", name: "Mizoram" },
            { code: "NL", name: "Nagaland" },
            { code: "OR", name: "Odisha" },
            { code: "PY", name: "Puducherry" },
            { code: "PB", name: "Punjab" },
            { code: "RJ", name: "Rajasthan" },
            { code: "SK", name: "Sikkim" },
            { code: "TN", name: "Tamil Nadu" },
            { code: "TS", name: "Telangana" },
            { code: "TR", name: "Tripura" },
            { code: "UP", name: "Uttar Pradesh" },
            { code: "UK", name: "Uttarakhand" },
            { code: "WB", name: "West Bengal" },
        ]
    },
    {
        code: "AU",
        name: "Australia",
        states: [
            { code: "ACT", name: "Australian Capital Territory" },
            { code: "NSW", name: "New South Wales" },
            { code: "NT", name: "Northern Territory" },
            { code: "QLD", name: "Queensland" },
            { code: "SA", name: "South Australia" },
            { code: "TAS", name: "Tasmania" },
            { code: "VIC", name: "Victoria" },
            { code: "WA", name: "Western Australia" },
        ]
    },
    {
        code: "GB",
        name: "United Kingdom",
        states: [
            { code: "ENG", name: "England" },
            { code: "SCT", name: "Scotland" },
            { code: "WLS", name: "Wales" },
            { code: "NIR", name: "Northern Ireland" },
        ]
    },
    {
        code: "DE",
        name: "Germany",
        states: [
            { code: "BW", name: "Baden-Württemberg" },
            { code: "BY", name: "Bavaria" },
            { code: "BE", name: "Berlin" },
            { code: "BB", name: "Brandenburg" },
            { code: "HB", name: "Bremen" },
            { code: "HH", name: "Hamburg" },
            { code: "HE", name: "Hesse" },
            { code: "MV", name: "Mecklenburg-Vorpommern" },
            { code: "NI", name: "Lower Saxony" },
            { code: "NW", name: "North Rhine-Westphalia" },
            { code: "RP", name: "Rhineland-Palatinate" },
            { code: "SL", name: "Saarland" },
            { code: "SN", name: "Saxony" },
            { code: "ST", name: "Saxony-Anhalt" },
            { code: "SH", name: "Schleswig-Holstein" },
            { code: "TH", name: "Thuringia" },
        ]
    },
];

export const getStatesByCountry = (countryCode: string): State[] => {
    const country = COUNTRIES_WITH_STATES.find(c => c.code === countryCode);
    return country?.states || [];
};

export const hasStates = (countryCode: string): boolean => {
    const states = getStatesByCountry(countryCode);
    return states.length > 0;
};