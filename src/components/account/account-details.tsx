'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserDetails, changePassword } from '@/services/user.service';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { AxiosError } from 'axios';
import { useToast } from '@/context/toast-context';

interface User {
  username: string;
  email: string;
  address: string;
  phone: string;
};

export default function AccountDetails({
  user,
  isLoading,
}: {
  user: User;
  isLoading: boolean;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const prefersReducedMotion = useReducedMotion();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userDetails'] });

      toast({
        title: 'Success',
        description: 'Your details have been updated.',
        variant: 'success'
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update details.',
        variant: 'error'
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Your password has been changed.',
        variant: 'success'
      });
      setIsPasswordEditing(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    },
    onError: (error:  AxiosError<{ message: string }>) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to change password.',
        variant: 'error'
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(formData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.', 
      });
      return;
    }
    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Account Details */}
      <motion.div
        className="border rounded-lg overflow-hidden shadow-sm"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Account Details</h3>
            <p className="text-sm text-gray-500">Manage your account information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={updateUserMutation.isPending                }
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
              >
                {updateUserMutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Change Password */}
      <motion.div
        className="border rounded-lg overflow-hidden shadow-sm"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Change Password</h3>
            <p className="text-sm text-gray-500">Update your password</p>
          </div>
          {!isPasswordEditing ? (
            <button
              onClick={() => setIsPasswordEditing(true)}
              className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
            >
              Change
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsPasswordEditing(false)}
                className="px-4 py-1 text-sm border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handlePasswordSubmit}
                disabled={changePasswordMutation.isPending}
                className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
              >
                {changePasswordMutation.isPending ? 'Updating...' : 'Update'}
              </button>
            </div>
          )}
        </div>

        {isPasswordEditing && (
          <form onSubmit={handlePasswordSubmit}>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label htmlFor="currentPassword" className="text-sm font-medium">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
