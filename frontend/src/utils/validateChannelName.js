export default function validateChannelName(channels, value) {
  const findChannel = channels.find((channel) => channel.name === value);
  if (!value) {
    return 'Required';
  }
  if (findChannel) {
    return 'Change Name';
  }
  return '';
}
