import { ITranslations } from "../store/Dictionaries.type";

export interface IValidateTranslationResp {
  domainError: string;
  rangeError: string;
  severity: string;
}

export function validateTranslation(
  domain: string,
  range: string,
  translationsUUID: string[],
  translations: ITranslations,
  uuid?: string
): IValidateTranslationResp {
  const validationData: IValidateTranslationResp = {
    domainError: "",
    rangeError: "",
    severity: ""
  };

  if (domain == range) {
    validationData.domainError = "Domain must not equal range";
    validationData.rangeError = "Range must not equal domain";
    validationData.severity = "error";
    return validationData;
  }

  translationsUUID.forEach(tuuid => {
    //in case of edit ignore the current uuid
    const isEdit = uuid && uuid == tuuid;
    if (!isEdit) {
      const translation = translations[tuuid];
      if (translation.domain == range && translation.range == domain) {
        const errorCycle =
          "Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.";

        validationData.domainError = errorCycle;
        validationData.rangeError = errorCycle;
        validationData.severity = "error";
        return validationData;
      }

      if (translation.domain == range) {
        validationData.rangeError =
          "There is a chain structure in the dictionary domain(A value in Range column also appears in Domain column )";
        validationData.severity = "error";
        return validationData;
      }

      if (translation.range == domain) {
        validationData.domainError =
          "There is a chain structure in the dictionary range(A value in Domain column also appears in Range column )";
        validationData.rangeError = "";
        validationData.severity = "error";
        return validationData;
      }

      if (domain == translation.domain && range == translation.range) {
        validationData.severity = "notice";
        validationData.domainError = "Duplicate Domain";
        validationData.rangeError = "Duplicate Range";
        return validationData;
      }

      if (domain == translation.domain) {
        validationData.severity = "notice";
        validationData.domainError =
          "Forks or Duplicate Domain with different Ranges";
      }

      if (range == translation.range) {
        validationData.severity = "notice";
        validationData.rangeError =
          "Forks or Duplicate Range with different Domains";
      }
    }
  });
  return validationData;
}
