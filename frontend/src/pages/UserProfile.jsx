import React, { useEffect, useState } from 'react'
import '../styles/UserProfile.css'
import api from '../api';
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from '../componets/Navbar';

const UserProfile = () => {
    const [profileData, setProfileData] = useState({
      username: '',
      email: '',
      phone: '',
      profileImage: null,
      profileImageFile: null,

    });

    const navigate = useNavigate()

    const fetchProfile = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
          return navigate('/login');
      }
      try {
          const response = await api.get('/api/user/');
          console.log(response.data);
          setProfileData({
              username: response.data.username,
              email: response.data.email,
              phone: response.data.phone,
              profileImage: response.data.profile_image,
              profileImageFile: null,
          });
      } catch (error) {
          console.error('Error fetching profile data', error);
          if (error.response.status === 401 || error.response.status === 403) {
              navigate('/login');
          }
      }
  };

  useEffect(() => {
      fetchProfile();
  }, [navigate]);

    const handleChange =  (e) => {
      e.preventDefault();
      setProfileData({...profileData, [e.target.name] : e.target.value});
    };
    console.log('name',profileData.username)
    console.log('phone',profileData.phone)
    console.log('email',profileData.email)
    console.log('images',profileData.profileImage)
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
        setProfileData({ 
            ...profileData, 
            profileImage: URL.createObjectURL(file), 
            profileImageFile: file 
        });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('access')
      const formData = new FormData();
      formData.append('username', profileData.username)
      formData.append('email', profileData.email)
      formData.append('phone', profileData.phone)
      if (profileData.profileImageFile) {
        formData.append('profile_image', profileData.profileImageFile);
    }

      try{

        const res =   await  api.patch('/api/user/', formData);
        console.log(res);
        alert('Profile updated successfully')
        fetchProfile();

      } catch(error){
        console.error('Error updating profile', error);
        alert('Profile updated failed')
      }
    }
  
    
  
    
  
  return (
    <>
    <ColorSchemesExample />
    
    <div className="container2">
      <div className="row2">
        <div className="col2">
          <div className="card2">
            <div className="card-body2">
              <h2 className="title2">Update Profile</h2>
              <div className="image-container2">
                {profileData.profileImage && (
                  <img
                    src={profileData.profileImage}
                    alt="Profile"
                    className="profile-image2"
                  />
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group2">
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="form-control2"
                    placeholder="Name"
                    />
                </div>
                <div className="form-group2">
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="form-control2"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group2">
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="form-control2"
                    placeholder="Phone"
                    />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    name="profileImage"
                    onChange={handleImageChange}
                    className="form-control2"
                    />
                </div>
                <button type="submit" className="btn2">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
                    </>
  )
}

export default UserProfile