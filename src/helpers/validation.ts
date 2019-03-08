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
  let domains: string[] = [];
  let ranges: string[] = [];
  translationsUUID.forEach(tuuid => {
    //in case of edit ignore the current uuid
    const isEdit = uuid && uuid == tuuid;
    if (!isEdit) {
      domains.push(translations[tuuid].domain);
      ranges.push(translations[tuuid].range);
    }
  });

  if (domain == range) {
    validationData.domainError = "Domain must not equal range";
    validationData.rangeError = "Range must not equal domain";
    validationData.severity = "error";
    return validationData;
  }

  if (
    domains.includes(domain) &&
    ranges.includes(domain) &&
    domains.includes(range) &&
    ranges.includes(range)
  ) {
    const errorCycle =
      "Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.";

    validationData.domainError = errorCycle;
    validationData.rangeError = errorCycle;
    validationData.severity = "error";
    return validationData;
  }

  if (domains.includes(range)) {
    const errorCycle =
      "There is a chain structure in the dictionary domain(A value in Range column also appears in Domain column )";

    validationData.domainError = "";
    validationData.rangeError = errorCycle;
    validationData.severity = "error";
    return validationData;
  }

  if (ranges.includes(domain)) {
    const errorCycle =
      "There is a chain structure in the dictionary range(A value in Domain column also appears in Range column )";

    validationData.domainError = errorCycle;
    validationData.rangeError = "";
    validationData.severity = "error";
    return validationData;
  }

  if (domains.includes(domain)) {
    validationData.domainError = "Duplicate Domain";
    validationData.severity = "notice";
    return validationData;
  }
  if (ranges.includes(range)) {
    validationData.rangeError = "Duplicate Range";
    validationData.severity = "notice";
    return validationData;
  }
  return validationData;
}
