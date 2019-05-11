var Constants = require('./src/Constants');
var ServerActions = require('./src/actions/ServerActionsSocketIO');
var Fluxxor = require('fluxxor');

var Store = Fluxxor.createStore({
  initialize: function() {
    this.devices = [];
    this.groups = [];
    this.inputNodesList = [];
    this.outputNodesList = [];
    this.deviceContact = {};
    this.deviceTemp = {};
    this.gatewayEui = '';
    this.serverLog = '';
    this.gatewayLog = '';
    this.testLog = '';
    this.tests = [];
    this.rules = [];
    this.cloudRules = [];
    this.otafiles = [];
    this.ip = '';
    this.serversettings = '';
    this.gatewaysettings = '';
    this.heartbeat = '';
    this.groupsnum = 0;
    this.buildinfo = '';
    this.identifyModeEntry = {};
    this.installCodeFromServer = '';
    this.testing = false;
    this.networkSecurityLevel = 'Z3';
    this.addingDeviceProgress = 0;
    this.addingDevice = false;
    this.addingDeviceTimer = 0;
    this.addingDeviceTimerExpired = false;
    this.otaWaitingTimer = 0;
    this.isOtaInProgress = {
      status: false,
      policy: '',
      item: {}
    };

    // this.cmdHistory = new CircularBuffer(Constants.COMMAND_HISTORY_LENGTH);

    /* Uncomment this line to add mock devices for UI validaiton */
    //this.testJoinColorControlLight();
    //this.testJoinDimmer();
    //this.testJoinOccupancy();

    // this.urlParameters = {};
    // window.location.search
    //   .replace(/[?&]+([^=&]+)=([^&]*)/gi, (str,key,value) => {
    //     this.urlParameters[key] = value;
    //   }
    // );

    this.bindActions(
      Constants.DEVICE_LIST_UPDATED, this.onDeviceListUpdated,
      // Constants.RULES_LIST_UPDATED, this.onRulesListUpdated,
      Constants.DEVICE_JOINED, this.onDeviceJoined,
      // Constants.DEVICE_LEFT, this.onDeviceLeft,
      // Constants.DEVICE_UPDATE, this.onDeviceUpdate,
      // Constants.SERVER_SETTINGS, this.onServerSettings,
      // Constants.GATEWAY_SETTINGS, this.onGatewaySettings,
      // Constants.OTA_EVENTS, this.onOtaEventUpdate,
      // Constants.OTA_AVAILABLE_FILES, this.otaFilesReceived,
      // Constants.SERVER_LOG, this.loadServerLog,
      // Constants.GATEWAY_LOG, this.loadGatewayLog,
      // Constants.TRAFFIC_TEST_LOG, this.loadTrafficTestLog,
      // Constants.TRAFFIC_TEST_RESULTS, this.onTrafficTestResults,
      // Constants.HEARTBEAT, this.onHeartbeat,
      // Constants.NETWORK_SECURITY_LEVEL, this.onNetworkSecurityLevel,
      // Constants.SERVER_LOG_STREAM, this.updateServerLogStream,
      // Constants.GATEWAY_LOG_STREAM, this.updateGatewayLogStream,
      // Constants.INSTALL_COLLECTION, this.updateInstallCodeFromServer
    );
  },

  onDeviceJoined: function(newNode) {
    console.log('onDeviceJoined: ', newNode)
  },

  onDeviceListUpdated: function(messageParsed) {
    console.log('onDeviceListUpdated')
  }
});

var stores = {
	store: new Store()
};

var Flux = new Fluxxor.Flux(stores, ServerActions);

if(Constants.CONSOLE_LOG_ENABLED) {
	Flux.on("dispatch", function(type, payload) {
		if (console && console.log) {
			console.log("[Dispatch]", type, payload);
		}
	});
}

Flux.actions.connect("http://localhost:9010", function(){
  console.log('Connected to SocketIO');
  Flux.actions.getGatewayState();
  Flux.actions.getWebserverState();
  Flux.actions.getOtaFiles();
});