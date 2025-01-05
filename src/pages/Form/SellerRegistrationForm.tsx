import React, { useState, useEffect, useRef, useCallback } from "react";
import { Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineShop } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";

const SellerRegistrationForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState({ lat: 51.5074, lng: 0.1278 }); // Default to San Francisco
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
  // Refs for map and marker
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDCs4nW7KM6puPvZdcaMrjcFDX_Wk53XCk", // Replace with your actual API key
    libraries: ["places"], // Include the "places" library for Autocomplete
  });

  useEffect(() => {
    if (isLoaded && mapRef.current && !markerRef.current) {
      // Initialize the marker on map load
      markerRef.current = new google.maps.Marker({
        position: markerPosition,
        map: mapRef.current,
        icon: {
          url: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png", // Red marker
          scaledSize: new google.maps.Size(50, 50), // Ensure the marker is large enough to be visible
        },
        draggable: true, // Enable drag and drop
      });

      // Event listener to update position when marker is dragged
      markerRef.current.addListener("dragend", () => {
        const position = markerRef.current?.getPosition();
        if (position) {
          const lat = position.lat();
          const lng = position.lng();
          setMarkerPosition({ lat, lng });

          // Reverse geocode the new position to update the address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results?.[0]) {
              setBusinessAddress(results[0].formatted_address);
            }
          });
        }
      });
    }
  }, [isLoaded, markerPosition]);

  const handleRegister = (values: any) => {
    console.log("Submitted Data: ", values);
  };

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Marker Position:", { lat, lng });
      setMarkerPosition({ lat, lng });

      // Move the marker
      if (markerRef.current) {
        markerRef.current.setPosition({ lat, lng });
      }

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          setBusinessAddress(results[0].formatted_address);
        }
      });
    }
  }, []);

  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat() || 0;
        const lng = place.geometry.location?.lng() || 0;
        setMarkerPosition({ lat, lng });

        // Move the marker
        if (markerRef.current) {
          markerRef.current.setPosition({ lat, lng });
        }

        setBusinessAddress(place.formatted_address || "");
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-graydark min-h-screen">
      <header className="flex items-center justify-between p-6 shadow-md bg-white dark:bg-graydark">
        <div className="flex items-center">
          <img src="/assets/imgs/Logo.png" alt="Logo" className="w-12 h-12 mr-4" />
          <h1 className="text-2xl font-bold text-black dark:text-white">70UPS</h1>
        </div>
        <button className="creative-button bg-primary text-white px-6 py-2 rounded-lg" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
            <div className="w-full lg:w-1/2">
              <div className="mb-8 text-center">
                <img src="/assets/imgs/Logo.png" alt="Logo" className="w-28 h-auto mx-auto" />
                <h2 className="text-3xl font-extrabold text-black dark:text-white mt-4">Seller Registration</h2>
                <p className="text-lg font-semibold text-black dark:text-white mt-2">
                  Create Your Account to Join Our Marketplace
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="p-8 shadow-2xl rounded-2xl bg-white dark:bg-gray-800">
                <Form layout="vertical" onFinish={handleRegister}>
                  <Form.Item name="fullName" rules={[{ required: true, message: 'Please enter your full name' }]}>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      prefix={<AiOutlineUser />}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </Form.Item>

                  <Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email format' }]}>
                    <Input
                      type="email"
                      placeholder="Email"
                      prefix={<AiOutlineMail />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true, message: 'Please create a password' }]}>
                    <Input.Password
                      prefix={<MdLockOutline />}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </Form.Item>

                  <Form.Item name="contactNumber" rules={[{ required: true, message: 'Please enter your contact number' }]}>
                    <Input
                      type="tel"
                      placeholder="Contact Number"
                      prefix={<AiOutlinePhone />}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </Form.Item>

                  <Form.Item name="businessName" rules={[{ required: true, message: 'Please enter your business name' }]}>
                    <Input
                      type="text"
                      placeholder="Business Name"
                      prefix={<AiOutlineShop />}
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </Form.Item>

                  <Form.Item name="businessAddress" rules={[{ required: true, message: "Please enter your business address" }]}>
                    <div>
                      {/* Address Search Field */}
                      {isLoaded && (
                        <Autocomplete
                          onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
                          onPlaceChanged={onPlaceSelected}
                        >
                          <Input
                            placeholder="Search business address"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            className="mb-4 border-gray-300 focus:ring-primary focus:ring-2 focus:border-primary"
                          />
                        </Autocomplete>
                      )}

                      {/* Map */}
                      {isLoaded ? (
                        <div className="h-[400px] mb-6">
                          <GoogleMap
                            mapContainerClassName="w-full h-full"
                            center={markerPosition}
                            zoom={10}
                            onClick={onMapClick}
                            onLoad={(map) => (mapRef.current = map)}
                          >
                            <Marker position={markerPosition} draggable={true} />
                          </GoogleMap>
                        </div>
                      ) : (
                        <p>Loading map...</p>
                      )}
                    </div>
                  </Form.Item>

                  <Form.Item name="document" label="Upload Business Document">
                    <Upload>
                      <Button icon={<UploadOutlined />}>Upload File</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Register as Seller
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col sm:flex-row sm:justify-between text-center mx-10 bg-gray-100 dark:bg-gray-800 py-4">
        <div className="sm:w-1/3 flex justify-center sm:justify-start items-center space-x-2">
          <img src="/assets/imgs/Logo.png" alt="Logo" className="w-8 h-8" />
          <h2 className="text-lg font-bold text-black dark:text-white">70UPS</h2>
        </div>
        <div className="sm:w-1/3 mt-2 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
          <a href="#" className="text-black dark:text-white hover:underline">Terms of Use</a>
          <a href="#" className="mt-2 sm:mt-0 text-black dark:text-white hover:underline">Privacy Policy</a>
        </div>
        <p className="sm:w-1/3 text-sm text-black dark:text-white mt-2 flex items-center justify-center sm:justify-end">
          &copy; {new Date().getFullYear()} 70UPS. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SellerRegistrationForm;
