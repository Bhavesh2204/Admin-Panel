import React, { useState, ChangeEvent, FormEvent } from 'react';
import AddressForm from './FormLayout'; 

interface Employer {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  primaryContact: string;
  secondaryContact: string;
  email: string;
  jobCategory: string;
  companyWebsite: string;
  accountStatus: string;
  companyLocation: string;
}

const initialEmployers: Employer[] = [
  {
    id: 1,
    firstName: 'Bhavesh',
    lastName: 'Mattani',
    company: 'Kshan Tech',
    primaryContact: '7066327993',
    secondaryContact: '1122331121',
    email: 'mattani.bhavesh@gmail.com',
    jobCategory: 'Full Stack Developer',
    companyWebsite: 'kshantechsoft.com',
    accountStatus: 'Active',
    companyLocation: 'Baner, Pune'
  }
];

const Dashboard: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>(initialEmployers);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMapForm, setShowMapForm] = useState<boolean>(false);
  const [newEmployer, setNewEmployer] = useState<Partial<Employer>>({});

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newEmployer) {
      setEmployers(prev => [
        ...prev,
        { id: prev.length + 1, ...newEmployer } as Employer
      ]);
    }
    setShowForm(false);
    setNewEmployer({});
  };

  const handleMapButtonClick = () => {
    setShowMapForm(true);
  };

  const closeMapForm = () => {
    setShowMapForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employers List</h1>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Employer
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Add New Employer</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Object.keys(initialEmployers[0]).map(key => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={key}
                  value={newEmployer[key] || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Submit
          </button>
          <button
            type="button"
            onClick={handleMapButtonClick}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Open Map Form
          </button>
        </form>
      )}

      {showMapForm && (
        <AddressForm onClose={closeMapForm} />
      )}

      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr>
            {Object.keys(initialEmployers[0]).map(key => (
              <th key={key} className="px-2 py-1 border-b">{key.replace(/([A-Z])/g, ' $1')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employers.map(emp => (
            <tr key={emp.id}>
              {Object.values(emp).map((value, index) => (
                <td key={index} className="px-2 py-1 border-b">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
