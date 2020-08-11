export default function converHourToMinutes(time: string) {

  // Transform all possitions in Numbers
  const [hour, minutes] = time.split(':').map(Number);

  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}