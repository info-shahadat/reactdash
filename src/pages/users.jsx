import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import "../assets/datatable.css";

function User() {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetch("http://192.168.7.192:8000/api/user-data")
      .then(res => res.json())
      .then(data => setUsers(data.data || []))
      .catch(console.error);
  }, []);

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true,},
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email },
    { name: "Mobile", selector: row => row.mobile },
    { name: "Department", selector: row => row.department },
    { name: "Status", selector: row => row.status },
    { name: "Role", selector: row => row.role },
  ];

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email.toLowerCase().includes(filterText.toLowerCase()) ||
      user.mobile.toLowerCase().includes(filterText.toLowerCase()) ||
      user.department.toLowerCase().includes(filterText.toLowerCase()) ||
      user.status.toLowerCase().includes(filterText.toLowerCase()) ||
      user.role.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponent = useMemo(() => (
    <input
      type="text"
      placeholder="Search..."
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
      className="data-table-search"
    />
  ), [filterText]);

  return (
    <div className="data-table-wrapper" style={{ padding: "10px" }}>
      <DataTable
        title={<div className="data-table-header"> <i className="bi bi-people-fill data-table-icon"></i> Users</div>}
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        striped
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        persistTableHead
        selectableRows={false}
        dense
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
  );
}

export default User;