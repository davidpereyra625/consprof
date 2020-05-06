// replace these values with those generated in your TokBox Account
var apiKey = "46715252";
var sessionId = "1_MX40NjcxNTI1Mn5-MTU4ODQ4NjgxMzk5N35DNndMRVRMR1BTODhkdkdMOWhwZGdVV2F-fg";
var token = "T1==cGFydG5lcl9pZD00NjcxNTI1MiZzaWc9ZDg0MmE1OThlOWZmNzNhMGE2MGZmZjUxN2I0YjkyODFkNmM4ODY2NzpzZXNzaW9uX2lkPTFfTVg0ME5qY3hOVEkxTW41LU1UVTRPRFE0TmpneE16azVOMzVETm5kTVJWUk1SMUJUT0Roa2RrZE1PV2h3WkdkVlYyRi1mZyZjcmVhdGVfdGltZT0xNTg4NDg2ODc4Jm5vbmNlPTAuMTI5ODA3MjcxNjMzMTY2NjMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5MTA3ODg3NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  // (optional) add server code here
  initializeSession();
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
      session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, handleError);
    });
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }
  // (optional) add server code here
  var SERVER_BASE_URL = 'https://conprof.herokuapp.com/';
  fetch(SERVER_BASE_URL + '/session').then(function(res) {
    return res.json()
  }).then(function(res) {
    apiKey = res.apiKey;
    sessionId = res.sessionId;
    token = res.token;
    initializeSession();
  }).catch(handleError);

