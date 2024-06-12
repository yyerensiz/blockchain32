// import React, { useState } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const SendNFT = ({ contract, account }) => {
//   const [receiver, setReceiver] = useState("");
//   const [tokenId, setTokenId] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await contract.methods.sendNFT(receiver, tokenId).send({ from: account });
//       alert('NFT sent successfully!');
//     } catch (error) {
//       console.error('Error sending NFT:', error);
//       alert('Error sending NFT:', error.message);
//     }
//     setReceiver("");
//     setTokenId("");
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formReceiver">
//         <Form.Label>Receiver Address</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter receiver address"
//           value={receiver}
//           onChange={(e) => setReceiver(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group controlId="formTokenId">
//         <Form.Label>Token ID</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter token ID"
//           value={tokenId}
//           onChange={(e) => setTokenId(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Send NFT
//       </Button>
//     </Form>
//   );
// };

// export default SendNFT;
