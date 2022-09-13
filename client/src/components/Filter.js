import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const BASE_URL = "http://localhost:5000/";

// style functions
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// style functions
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const Filter = () => {
  // states
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [initialAuth, setInitialAuth] = useState(false);
  const [enhancement, setEnhancement] = useState(false);
  const [discharge, setDischarge] = useState(false);
  const [finalAuth, setFinalAuth] = useState(false);
  const [pending, setPending] = useState(false);
  const [tpa, setTpa] = useState(false);

  // fetching table data on component mounting
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${BASE_URL}api/table`);
      setTableData(response.data.data);
    };
    fetchData();
  }, []);

  // fetching updated table data based on search and filter
  useEffect(() => {
    const fetchData = async () => {
      let stagesObj = {
        "Initial Authorization": initialAuth,
        Enhancement: enhancement,
        Discharge: discharge,
        "Final Authorization": finalAuth,
      };
      let statusObj = {
        "Pending Approval": pending,
        "TPA Query": tpa,
      };
      let stagesArr = [],
        statusArr = [];
      for (let key in stagesObj) {
        if (stagesObj[key]) {
          stagesArr.push(key);
        }
      }

      for (let key in statusObj) {
        if (statusObj[key]) {
          statusArr.push(key);
        }
      }
      statusArr = statusArr.filter((status) => status);
      const response = await axios.get(
        `${BASE_URL}api/table/filter?search=${searchTxt}&&stages=${JSON.stringify(
          stagesArr
        )}&&status=${JSON.stringify(statusArr)}`
      );
      console.log(response.data);
      setTableData(response.data.data);
    };
    fetchData();
  }, [initialAuth, pending, tpa, discharge, finalAuth, enhancement, searchTxt]);

  // Modal open fn
  const handleOpen = () => setOpen(true);
  // Modal close fn
  const handleClose = () => setOpen(false);

  return (
    <div style={{ padding: "3rem 5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Button onClick={handleOpen}>Filter</Button>
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTxt(e.target.value)}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ padding: "1rem", backgroundColor: "lightblue" }}
            >
              Stage
            </Typography>
            <FormGroup style={{ padding: "1rem" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={initialAuth}
                    value="initialAuth"
                    onChange={() => setInitialAuth((prev) => !prev)}
                  />
                }
                label="Initial Authorization"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enhancement}
                    value="enhancement"
                    onChange={() => setEnhancement((prev) => !prev)}
                  />
                }
                label="Enhancement"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={discharge}
                    value="discharge"
                    onChange={() => setDischarge((prev) => !prev)}
                  />
                }
                label="Discharge"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={finalAuth}
                    value="finalAuth"
                    onChange={() => setFinalAuth((prev) => !prev)}
                  />
                }
                label="Final Authorization"
              />
            </FormGroup>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ padding: "1rem", backgroundColor: "lightblue" }}
            >
              Status
            </Typography>
            <FormGroup style={{ padding: "1rem" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pending}
                    value="pending"
                    onChange={() => setPending((prev) => !prev)}
                  />
                }
                label="Pending Approval"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={tpa}
                    value="tpa"
                    onChange={() => setTpa((prev) => !prev)}
                  />
                }
                label="TPA Query"
              />
            </FormGroup>
          </div>
        </Box>
      </Modal>

      {/* table */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ClaimID</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Ailment</StyledTableCell>
              <StyledTableCell align="left">SLA</StyledTableCell>
              <StyledTableCell align="left">P-TAT</StyledTableCell>
              <StyledTableCell align="left">Stage</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Approved Amount</StyledTableCell>
              <StyledTableCell align="left">Hospital</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <StyledTableRow key={data._id}>
                <StyledTableCell component="th" scope="row">
                  {data.ClaimID}
                </StyledTableCell>
                <StyledTableCell align="left">{data.Name}</StyledTableCell>
                <StyledTableCell align="left">{data.Ailment}</StyledTableCell>
                <StyledTableCell align="left">{data.SLA}</StyledTableCell>
                <StyledTableCell align="left">{data["P-TAT"]}</StyledTableCell>
                <StyledTableCell align="left">{data.Stage}</StyledTableCell>
                <StyledTableCell align="left">{data.Status}</StyledTableCell>
                <StyledTableCell align="left">
                  {data["Approved Amount"]}
                </StyledTableCell>
                <StyledTableCell align="left">{data.Hospital}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Filter;
