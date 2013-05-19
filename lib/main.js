let pref_service = require("sdk/preferences/service");
let is_responvesive_config = pref_service.has("devtools.responsiveUI.enabled");
// check responsive tool in Firefox 
if (is_responvesive_config === true) {
	let simple_preferences = require("sdk/simple-prefs");

	let pref_responsive_presets = "devtools.responsiveUI.presets";
	let new_presets = [{"key":"320x240","name":"QVGA (Nintendo 3DS [lower screen])","width":320,"height":240},{"key":"320x480","name":"HVGA (iPod Touch 1st-3rd, iPhone 3G & 3Gs)","width":320,"height":480},{"key":"360x640","name":"nHD","width":360,"height":640},{"key":"640x480","name":"VGA","width":640,"height":480},{"key":"800x480","name":"WVGA","width":800,"height":480},{"key":"854x480","name":"FWVGA","width":854,"height":480},{"key":"960x540","name":"qHD","width":960,"height":540},{"key":"960x640","name":"DVGA (iPhone 4 & 4s)","width":960,"height":640},{"key":"768x1024","name":"XGA (iPad 1, iPad 2, iPad Mini)","width":768,"height":1024},{"key":"1136x640","name":"iPhone 5, iPod Touch 5th","width":1136,"height":640},{"key":"1280x600","width":1280,"height":600},{"key":"1280x720","name":"HD / WXGA","width":1280,"height":720},{"key":"1280x768","name":"WXGA (Lumia 920, Nexus 4)","width":1280,"height":768},{"key":"800x1280","name":"WXGA (Kindle Fire HD 7\", Nexus 7, 16:10 notebooks)","width":800,"height":1280},{"key":"980x1280","width":980,"height":1280},{"key":"1280x1024","name":"SXGA (Non-standard 4:3 monitors)","width":1280,"height":1024},{"key":"1366x768","name":"WXGA (16:9 PC monitors & notebooks, Macbook Air 11\", Surface)","width":1366,"height":768},{"key":"1440x900","name":"WXGA+ (19\" 16:10 PC monitors, Macbook Air 13\")","width":1440,"height":900},{"key":"1600x900","name":"HD+ (Medium 16:9 PC monitors & notebooks)","width":1600,"height":900},{"key":"1680x1050","name":"WSXGA+","width":1680,"height":1050},{"key":"1920x900","width":1920,"height":900},{"key":"1920x1080","name":"Full HD (Large 16:9 PC monitors, Surface Pro, Unibody iMac 21.5\")","width":1920,"height":1080},{"key":"1920x1200","name":"WUXGA (Kindle Fire HD 8.9\", Large 16:10 PC monitors & notebooks)","width":1920,"height":1200},{"key":"2048x1536","name":"QXGA (iPad 3 & 4)","width":2048,"height":1536},{"key":"2560x1440","name":"(W)Quad HD (27\" 16:9 PC monitors, Unibody iMac 27\")","width":2560,"height":1440},{"key":"2560x1600","name":"WQXGA (30\" 16:10 PC monitor, 13\" Macbook Pro with Retina Display, Nexus 10)","width":2560,"height":1600},{"key":"2880x1800","name":"WQXGA+ (15\" Macbook Pro with Retina Display)","width":2880,"height":1800}];
	let original_presets = [{key:"320x480",width:320,height:480},{key:"360x640",width:360,height:640},{key:"768x1024",width:768,height:1024},{key:"800x1280",width:800,height:1280},{key:"980x1280",width:980,height:1280},{key:"1280x600",width:1280,height:600},{key:"1920x900",width:1920,height:900}];
	let is_reset = 0;

	exports.main = function (options, callbacks) {
		let reset = function(){
			pref_service.set(pref_responsive_presets ,JSON.stringify(original_presets));
			is_reset = 1;
		}
		let restore = function(){
			pref_service.set(pref_responsive_presets ,JSON.stringify(new_presets));
		}

		if (options.loadReason == 'install') {
			pref_service.set(pref_responsive_presets, JSON.stringify(new_presets));
		}
		// when extension preference is changed, change the firefox's preference value
		simple_preferences.on("reset_presets", reset);
		simple_preferences.on("restore_presets", restore);
	};

	exports.onUnload = function (reason) {
		// Hard reset during shutdown
		if (reason == "shutdown" && is_reset == 1) {
			pref_service.reset(pref_responsive_presets);
		}
	};
}