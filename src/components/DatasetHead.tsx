import React from "react";
interface IDatasetHeaderProps {
  [uuid: string]: string | number;
}
export default (data: IDatasetHeaderProps) => (
  <thead>
    <tr>
      {Object.keys(data).map(title => (
        <th key={title}>{title}</th>
      ))}
    </tr>
  </thead>
);
