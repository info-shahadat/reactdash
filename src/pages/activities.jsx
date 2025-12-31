import React, { useEffect, useState, useMemo, useCallback } from "react";
import DataTable from "react-data-table-component";
import "../assets/datatable.css";
import Select from "react-select";

function Activity() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchActivities = useCallback((page = 1, size = perPage) => {
    setLoading(true);
    const url = `http://192.168.7.192:8000/api/activities?search=${filterText}&user_id=${selectedUser}&page=${page}&per_page=${size}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setActivities(res.data || []);
        setTotalRows(res.meta.total || 0);
        setPerPage(res.meta.per_page);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filterText, selectedUser, perPage]);

  useEffect(() => {
    fetchActivities(1);
  }, [fetchActivities]);

  useEffect(() => {
    fetch("http://192.168.7.192:8000/api/users/list")
      .then(res => res.json())
      .then(data => setUsers(data.data || []))
      .catch(console.error);
  }, []);

  const columns = [
    { name: "User", selector: row => row.user?.name || "System", sortable: true },
    { name: "Action", selector: row => row.action, sortable: true },
    { name: "Description", selector: row => row.description },
    { name: "Date", selector: row => new Date(row.created_at).toLocaleString(), sortable: true },
  ];

  const subHeaderComponent = useMemo(() => (
    <div className="activity-filters">
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        className="data-table-search"
      />

      <Select
        options={[
          { value: "", label: "All Users" },
          ...users.map(u => ({ value: u.id, label: u.name }))
        ]}
        value={
          users.find(u => u.id === selectedUser)
            ? { value: selectedUser, label: users.find(u => u.id === selectedUser).name }
            : { value: "", label: "All Users" }
        }
        onChange={opt => setSelectedUser(opt?.value || "")}
        placeholder="Select user..."
        isClearable
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
      />
    </div>
  ), [filterText, selectedUser, users]);

  return (
    <div className="data-table-wrapper" style={{ padding: "10px" }}>
      <DataTable
        title={
          <div className="data-table-header">
            <i className="bi bi-list-task data-table-icon"></i> User Activities
          </div>
        }
        columns={columns}
        data={activities}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={page => fetchActivities(page)}
        onChangeRowsPerPage={(newPerPage) => {
          setPerPage(newPerPage);
          fetchActivities(1, newPerPage);
        }}
        highlightOnHover
        striped
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        persistTableHead
        dense
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
  );
}

export default Activity;
