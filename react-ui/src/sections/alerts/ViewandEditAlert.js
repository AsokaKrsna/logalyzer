import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_SERVER } from 'src/config/constant';
import { fetchPlaybooks } from 'src/utils/fetchPlaybooks';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';

const ColorPicker = ({ value, onChange }) => (
  <TextField
    type="color"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    label="Color"
  />
);

export default function ViewandEditAlert(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [signature, setSignature] = useState('');
  const [score, setScore] = useState(0);
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#000000');
  const [ref_links, setRefLinks] = useState('');
  const [selectedPlaybooks, setSelectedPlaybooks] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);

  const[alertData,setalertData] = useState([]);
  const[crpfunitData,setcrpfunitData] = useState([]);
  const[crpfdeviceData,setcrpfdeviceData] = useState([]);
  const[threatData,setthreatData] = useState([]);
  const[loglinedata,setloglinedata] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
    <ToastContainer />

      <Button
        onClick={async () => {
            try {
              const [
                alertResponse,
                crpfUnitResponse,
                crpfDeviceResponse,
                ThreatResponse,
                LoglineResponse,
              ] = await Promise.all([
                axios.get(API_SERVER + `view_alert_by_id/${props.alert_id}`),
                axios.get(API_SERVER + `view_unit_by_id/${props.crpf_unit_id}`),
                axios.get(API_SERVER + `view_device_by_id/${props.crpf_device_id}`),
                axios.get(API_SERVER + `view_threat_by_id/${props.threat_signature_id}`),
                axios.get(API_SERVER + `view_log_line_by_id/${props.log_line}`),
              ]);
        
              setalertData(alertResponse.data);
              console.log("Alert Data", alertData);
        
              // Uncomment the following lines if needed
              setcrpfunitData(crpfUnitResponse.data);
              console.log("Crpf Unit Data", crpfunitData);
        
              setcrpfdeviceData(crpfDeviceResponse.data);
              console.log("Crpf Device Data", crpfdeviceData);
        
              setthreatData(ThreatResponse.data);
              console.log("Threat Response", threatData);
        
              setloglinedata(LoglineResponse.data);
              console.log("logline data", loglinedata);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        
            setOpen(true);
          }}
      >
     <SettingsApplicationsSharpIcon sx={{ color: 'black' }}/>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Create threat
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Fill in the information of the threat. {props.name}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Signature</FormLabel>
                <Input required value={signature} onChange={(e) => setSignature(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Score</FormLabel>
                <Input type="number" required value={score} onChange={(e) => setScore(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Color</FormLabel>
                <ColorPicker value={color} onChange={setColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Background Color</FormLabel>
                <ColorPicker value={bgColor} onChange={setBgColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Reference Link</FormLabel>
                <Input required value={ref_links} onChange={(e) => setRefLinks(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Playbook</FormLabel>
                <Select
                  label="Playbook"
                  value={selectedPlaybooks}
                  onChange={(e) => setSelectedPlaybooks(e.target.value)}
                  multiple
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {selected.map((pb) => (
                        <Chip key={pb.id} label={pb.name} sx={{ margin: '2px' }} />
                      ))}
                    </Box>
                  )}
                >
                  {playbooks.map((pb) => (
                    <MenuItem key={pb.id} value={pb}>
                      {pb.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
