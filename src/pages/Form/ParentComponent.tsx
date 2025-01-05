import React, { useState } from 'react';
import AddressForm from './FormLayout'; // Adjust the import path as necessary
const ParentComponent: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(true);
  const handleCloseForm = () => {
    setFormVisible(false);
  };
  return (
    <div>
      {isFormVisible && <AddressForm onClose={handleCloseForm} />}
      {/* Other components or content */}
    </div>
  );
};
export default ParentComponent;







