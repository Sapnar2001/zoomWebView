import React, { useState,useEffect } from 'react';
import './App.css';
import { ZoomMtg } from '@zoom/meetingsdk';
const KJUR = require('jsrsasign');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

function App() {
  var authEndpoint = 'https://133a-2409-40d2-31-d7bf-18da-5e9f-9132-b23e.ngrok-free.app'
// var authEndpoint = 'http://localhost:4000'
  var sdkKey = 'WNqkjZi4S7q4m0nwwBNPqQ'
  var meetingNumber = '89622034346'
  var passWord = '1rA79Q'
  var role = 0
  var userName = 'abcdefgh'
  var userEmail = ''
  var registrantToken = ''
  var leaveUrl = "https://zoom.us"
  // "https://zoom.us"
  // https://www.google.com
 
//   function abc(){
//     ZoomMtg.leaveMeeting({
//         confirm: true, // Show confirmation dialog
//         cancelCallback: () => {
//           console.log('123456Leave action cancelled');
//         },
//         success: () => {
//           console.log('1234567Successfully left the meeting');
//         },
//         error: (error) => {
//           console.error('1234566Error leaving the meeting:', error);
//         }
//       });
//   }
  async function getSignature(e) {
    e.preventDefault();
    const response = await fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingNumber, role,}),
    })
    const signatureData = await response.json()
    console.log('response: ', signatureData.signature);
    startMeeting(signatureData.signature)
    // fetch(authEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     meetingNumber: meetingNumber,
    //     role: role
    //   })
    // }).then(res => res.json())
    // .then(response => {
    //   console.log("res",response.signature)
    //   startMeeting(response.signature)
    // }).catch(error => {
    //   console.log("22",error)
    //   console.error(error)
    // })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
        leaveUrl: leaveUrl,
        patchJsMedia: true,
        success: (success) => {
            console.log('12',success);

            ZoomMtg.join({
                signature: signature,
                sdkKey: sdkKey,
                meetingNumber: meetingNumber,
                passWord: passWord,
                userName: userName,
                userEmail: userEmail,
                zak: signature,
                success: (...params) => {
                  console.log('abc', ...params);
                 setTimeout(() => {
                  const currentUser = ZoomMtg.getCurrentUser();
                  console.log("1233333333",currentUser)
                 }, 1000);
                   
                },
                error: (error) => {
                    console.log('error', error);
                }
            });

            // Adding event listeners
            ZoomMtg.inMeetingServiceListener('onUserJoin', (data) => {
                console.log('123User Joined:', data);
                if (data.userId === ZoomMtg.getAttendeeslist.getCurrentUserId()) {
                    // Record the time when the local user joined
                    setJoinedAt(new Date());
                  }
            });
            

            ZoomMtg.inMeetingServiceListener('onUserLeave', (data) => {
                console.log('123User Left:', data);
            });

            ZoomMtg.inMeetingServiceListener('onUserVideoStatusChange', (data) => {
                console.log('123User Video Status Changed:', data);
            });
            ZoomMtg.getCurrentMeetingInfo({
              success: (info) => {
                  console.log('123Current Meeting Info:', info);
              },
              error: (error) => {
                  console.log('Error getting current meeting info:', error);
              }
          });
          ZoomMtg.getWebSDKVersion({
            success: (version) => {
                console.log('123Web SDK Version:', version);
            },
            error: (error) => {
                console.log('Error getting Web SDK version:', error);
            }
        });


      
        ZoomMtg.inMeetingServiceListener('meetingLocked', (data) => {
          console.log('123Meeting Locked:', data);
      });

      ZoomMtg.inMeetingServiceListener('meetingUnlocked', (data) => {
          console.log('123Meeting Unlocked:', data);
      });

      ZoomMtg.inMeetingServiceListener('participantMuted', (data) => {
          console.log('123Participant Muted:', data);
      });

      ZoomMtg.inMeetingServiceListener('participantUnmuted', (data) => {
          console.log('123Participant Unmuted:', data);
      });

      ZoomMtg.inMeetingServiceListener('participantSpotlighted', (data) => {
          console.log('123Participant Spotlighted:', data);
      });

      ZoomMtg.inMeetingServiceListener('participantUnspotlighted', (data) => {
          console.log('123Participant Unspotlighted:', data);
      });

      ZoomMtg.inMeetingServiceListener('chatMessageSent', (data) => {
          console.log('123Chat Message Sent:', data);
      });

      ZoomMtg.inMeetingServiceListener('recordingStarted', (data) => {
          console.log('123Recording Started:', data);
      });

      ZoomMtg.inMeetingServiceListener('recordingStopped', (data) => {
          console.log('123Recording Stopped:', data);
      });
        },
        error: (error) => {
            console.log(error);
        }
    });
}
const [joinedAt, setJoinedAt] = useState(null);

useEffect(() => {
    setTimeout(() => {
        console.log("joinedAt1234455555",joinedAt)
    }, 3000);
   
}, [])

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>
        <button onClick={getSignature}>Join Meeting</button>
      
      </main>
    </div>
  );
}

export default App;
