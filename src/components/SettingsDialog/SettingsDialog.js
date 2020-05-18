import {Button} from "react-bootstrap";
import React, {useState} from 'react';
import ModalHeader from "react-bootstrap/ModalHeader";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

const SettingsDialog = ({show, onSettingsSaved, onClose, currentSort, currentSortOrder, currentDisplayUnits}) => {
    const [sortProperty, setSortProperty] = useState(currentSort);
    const [sortOrder, setSortOrder] = useState(currentSortOrder);
    const [displayUnits, setDisplayUnits] = useState(currentDisplayUnits);
    const oldDisplayUnits = currentDisplayUnits;

    return (
        <Modal show={show} onHide={onClose} animation={false} centered>
            <ModalHeader>
                <ModalTitle>Settings</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <label>Sort by</label>&nbsp;
                <select value={sortProperty} onChange={e => setSortProperty(e.target.value)}>
                    <option value={"none"}>None</option>
                    <option value={"name"}>Name</option>
                    <option value={"temperature"}>Temperature</option>
                    <option value={"conditions"}>Conditions</option>
                    <option value={"humidity"}>Humidity</option>
                    <option value={"windSpeed"}>Wind Speed</option>
                </select>
                &nbsp;&nbsp;
                <input type={"radio"} id={"ascending"} name={"sortOrder"} value={"ascending"} checked={sortOrder === "ascending"}
                        onChange={() => setSortOrder("ascending")}/>
                <label htmlFor={"ascending"}>Ascending</label>
                &nbsp;
                <input type={"radio"} id={"descending"} name={"sortOrder"} value={"descending"} checked={sortOrder === "descending"}
                        onChange={() => setSortOrder("descending")}/>
                <label htmlFor={"descending"}>Descending</label>
                <br/>
                <label>Display units:</label>&nbsp;&nbsp;
                <input type={"radio"} id={"imperial"} name={currentDisplayUnits} value={"imperial"} checked={displayUnits === "imperial"}
                        onChange={() => setDisplayUnits("imperial")}/>
                <label htmlFor={"imperial"}>Imperial</label>
                &nbsp;
                <input type={"radio"} id={"metric"} name={currentDisplayUnits} value={"metric"} checked={displayUnits === "metric"}
                        onChange={() => setDisplayUnits("metric")}/>
                <label htmlFor={"metric"}>Metric</label>
            </ModalBody>
            <ModalFooter>
                <Button variant={"primary"} onClick={() => onSettingsSaved(sortProperty, sortOrder, oldDisplayUnits, displayUnits)}>Save</Button>
                <Button variant={"secondary"} onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    );
}

export default SettingsDialog;