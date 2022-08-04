import { location } from "../native/location";
if(!('origin' in location)) {
	location.origin = location.protocol + "//" + location.host;
}