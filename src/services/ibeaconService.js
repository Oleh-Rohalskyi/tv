



android.app.Service.extend("com.ms.track", {

	onStartCommand: function(intent, flags, startId) {
		this.super.onStartCommand(intent, flags, startId);
		return android.app.Service.START_STICKY; 
	},

	onCreate: function() {
		console.log('onCreate')
	},

	onBind: function(intent) {
		console.log("##onBind NOT YET IMPLEMENTED");
	}
})

module.exports = {}