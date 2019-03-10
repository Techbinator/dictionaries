import { validateTranslation } from "./validation";
import {
  translationsUUID,
  translations,
  domain,
  range
} from "./__mocks__/validations.json";

describe("validateTranslation", () => {
  it("should pass in case of right data", () => {
    const expected = {
      domainError: "",
      rangeError: "",
      severity: ""
    };
    expect(
      validateTranslation(
        "new domain",
        "new range",
        translationsUUID,
        translations
      )
    ).toEqual(expected);
  });
  it("should fail in case of duplicate domain", () => {
    const expected = {
      domainError: "Duplicate Domain",
      rangeError: "Duplicate Range",
      severity: "notice"
    };
    expect(
      validateTranslation(domain, range, translationsUUID, translations)
    ).toEqual(expected);
  });

  it("should fail in case of range equals domain", () => {
    const expected = {
      domainError: "Domain must not equal range",
      rangeError: "Range must not equal domain",
      severity: "error"
    };
    expect(
      validateTranslation("test", "test", translationsUUID, translations)
    ).toEqual(expected);
  });

  it("should fail in case of Forks or Duplicate Range with different Domains", () => {
    const expected = {
      domainError: "",
      rangeError: "Forks or Duplicate Range with different Domains",
      severity: "notice"
    };
    expect(
      validateTranslation("new domain", range, translationsUUID, translations)
    ).toEqual(expected);
  });

  it("should fail in case of Forks or Duplicate Domain with different Ranges", () => {
    const expected = {
      domainError: "Forks or Duplicate Domain with different Ranges",
      rangeError: "",
      severity: "notice"
    };
    expect(
      validateTranslation(domain, "new range", translationsUUID, translations)
    ).toEqual(expected);
  });

  it("should pass in case the value we pass uuid(edit mode)", () => {
    const expected = {
      domainError: "",
      rangeError: "",
      severity: ""
    };
    expect(
      validateTranslation(domain, range, translationsUUID, translations, "1")
    ).toEqual(expected);
  });

  it("should fail in case of two or more rows in a dictionary result in cycles", () => {
    const expected = {
      domainError:
        "Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.",
      rangeError:
        "Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.",
      severity: "error"
    };
    const newTranslations = {
      ...translations,
      "4": {
        uuid: "4",
        domain: "Dark Grey",
        range: "Stonegrey"
      }
    };
    const newtranslationsUUID = [...translationsUUID, "4"];
    expect(
      validateTranslation(domain, range, newtranslationsUUID, newTranslations)
    ).toEqual(expected);
  });

  it("should fail if a chain structure in the dictionary (a value in Range column also appears in Domain column of another entry)", () => {
    const expected = {
      domainError: "",
      rangeError:
        "There is a chain structure in the dictionary domain(A value in Range column also appears in Domain column )",
      severity: "error"
    };
    expect(
      validateTranslation("new range", domain, translationsUUID, translations)
    ).toEqual(expected);
  });

  it("should fail if a chain structure in the dictionary (a value in Domain column also appears in Range column of another entry)", () => {
    const expected = {
      rangeError: "",
      domainError:
        "There is a chain structure in the dictionary range(A value in Domain column also appears in Range column )",
      severity: "error"
    };
    expect(
      validateTranslation(
        "Dark Grey",
        "new domain",
        translationsUUID,
        translations
      )
    ).toEqual(expected);
  });
});
