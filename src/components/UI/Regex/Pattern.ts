export const uppercase: RegExp = /^[A-Z]/;
export const specialCharacter: RegExp = /[/!/@/#/$/%/^/&/*/()]/;
export const date: RegExp = /^[0-9]/;

export const namePattern: string = "^[A-Z][a-z]{3,20}$";
export const locationPattern: string = "^[A-Z][^0-9]{4,20}$";
export const phonePattern: string = "^(+d{1,2}s)?(?d{3})?[s.-]d{3}[s.-]d{4}$";
export const zipcodePattern: string = "^d{5}(?:[-s]d{4})?$";
export const passwordPattern: string =
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-ZdwW]{8,}$";
export const SSNPattern: string =
  "^(?!(000|666|9))d{3}-(?!00)d{2}-(?!0000)d{4}$";
