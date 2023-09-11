export default function validateChannelName(channels, value) {
  let error = '';
  const findChannel = channels.find((channel) => channel.name === value);
  if (!value) {
    error = 'Required';
  }
  if (findChannel) {
    error = 'Change Name';
  }
  return error;
}
