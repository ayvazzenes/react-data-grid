
import "./Table.css";
import { data } from "../../data";


const Table = ({onSearch,onSelect}) => {
  
  console.log(onSelect);
  const filteredData = data.filter((item) => {
    const mediaName = item.media_link.toLowerCase();
    return mediaName.includes(onSearch.toLowerCase());
  });
  
  return (
    <table className="app-table">
      <thead className="app-table-head">
        <tr className="app-table-head-row">
          <th>Sosyal Medya Link</th>
          <th>Sosyal Medya Adı</th>
          <th>Açıklama</th>
        </tr>
      </thead>
      <tbody className="app-table-body">
        {filteredData.map((item) => (
          <tr className="app-table-body-row" key={item.id}>
            <td>{item.media_link}</td>
            <td>{item.media_name}</td>
            <td>
              {item.media_description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
