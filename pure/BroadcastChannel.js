import { BroadcastChannel as native_BroadcastChannel } from "../native/BroadcastChannel";
import { BroadcastChannel as impl_BroadcastChannel } from "../impl/BroadcastChannel";

export default native_BroadcastChannel || impl_BroadcastChannel;
