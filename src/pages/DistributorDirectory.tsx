import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useStore } from "../context/store/store";
import type { DistributorContact } from "../types/types";

const DistributorDirectory: React.FC = () => {
  const { getDistributors } = useStore();
  const distributors: DistributorContact[] = getDistributors();

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
          Network
        </p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Distributors
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Find distributor contacts for Milma supply in your region.
        </p>
      </div>

      {/* Distributor Cards */}
      <div className="space-y-4">
        {distributors.map((d) => (
          <div
            key={d.id}
            className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 
                       rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Top Section */}
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400">{d.id}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {d.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <MapPin size={14} className="text-red-500" />
                  {d.region}
                </p>
              </div>

              {/* Specialties */}
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-1">Specialties</p>
                <div className="flex flex-wrap justify-end gap-1 max-w-[160px]">
                  {d.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-1 rounded-full 
                                 bg-blue-50 text-blue-700 
                                 dark:bg-blue-500/10 dark:text-blue-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`tel:${d.phone}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
                           bg-green-50 text-green-700 border border-green-100
                           dark:bg-green-500/10 dark:text-green-200 dark:border-green-500/20"
              >
                <Phone size={16} />
                {d.phone}
              </a>

              <a
                href={`mailto:${d.email}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
                           bg-blue-50 text-blue-700 border border-blue-100
                           dark:bg-blue-500/10 dark:text-blue-200 dark:border-blue-500/20"
              >
                <Mail size={16} />
                {d.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributorDirectory;
