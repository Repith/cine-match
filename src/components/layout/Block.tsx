import { ReactElement } from 'react';

type InfoTileProps = {
  icon: ReactElement;
  title: string;
  text: string;
};

const InfoTile = ({ icon, title, text }: InfoTileProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-md hover:scale-105 transition-all ease-in-out">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default InfoTile;
