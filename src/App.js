import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Chat from './components/Chat';
//import SendNFT from './components/SendNFT';
import UserList from './components/UserList';
import DecentralizedChatABI from './contracts/DecentralizedChat.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserListWindow from './components/UserListWindow';

//const contractAddress = '0x81014bf6e357b4ac182565a4e49eec29b30bc46d'; // Replace with your deployed contract address
const contractAddress = '0xfc02660432a04a22f46c02980942bd1fbfc1c144';

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const contract = new web3.eth.Contract(DecentralizedChatABI, contractAddress);
      setContract(contract);

      const user = await contract.methods.users(accounts[0]).call();
      setRegistered(user.wallet !== "0x0000000000000000000000000000000000000000");

      if (user.wallet !== "0x0000000000000000000000000000000000000000") {
        setNickname(user.nickname);
      }

      const registeredUsers = await contract.methods.getAllUsers().call();
      const usersData = await Promise.all(registeredUsers.map(async (userAddress) => {
        const userInfo = await contract.methods.users(userAddress).call();
        return userInfo;
      }));
      setUsers(usersData);
    }
  };

  const registerUser = async (nickname) => {
    await contract.methods.register(nickname).send({ from: account });
    setRegistered(true);
    setNickname(nickname);
    loadBlockchainData(); // Reload data to update user list
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="App">
      <Navbar account={account} />
      <div className="container">
        {!registered ? (
          <Register registerUser={registerUser} />
        ) : (
          <div className="row">
            <div className="col-md-4">
              <UserListWindow users={users} onSelectUser={handleUserSelect} />
            </div>
            <div className="col-md-8">
              {selectedUser ? (
                <Chat
                  contract={contract}
                  account={account}
                  selectedUser={selectedUser}
                />
              ) : (
                <h2>Select a user to start chatting</h2>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;