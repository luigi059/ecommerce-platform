import { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
	useDeleteUserMutation,
	useGetUsersQuery,
	useUpdateProfileByIdMutation,
} from '../../redux/api/userApiSlice';

const UserList = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();
	const [deleteUser] = useDeleteUserMutation();
	const [updateProfileById] = useUpdateProfileByIdMutation();

	const [updateUserId, setUpdateUserId] = useState(null);
	const [updateUsername, setUpdateUsername] = useState('');
	const [updateUserEmail, setUpdateUserEmail] = useState('');

	useEffect(() => {
		refetch();
	}, [refetch]);

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure?')) {
			try {
				await deleteUser(id);
				refetch();
			} catch (error) {
				toast.error(error.data.message || error.error);
			}
		}
	};

	const toggleEdit = (id, username, email) => {
		setUpdateUserId(id);
		setUpdateUsername(username);
		setUpdateUserEmail(email);
	};

	const updateHandler = async (id) => {
		try {
			await updateProfileById({
				userId: id,
				username: updateUsername,
				email: updateUserEmail,
			});
			setUpdateUserId(null);
			refetch();
		} catch (error) {
			toast.error(error.data.message || error.error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-semibold mb-4">Users</h1>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">
					{error?.data.message || error.message}
				</Message>
			) : (
				<div className="flex flex-col md:flex-row">
					<table className="w-full md:w-4/5 mx-auto">
						<thead>
							<tr>
								<th className="px-4 py-2 text-left">ID</th>
								<th className="px-4 py-2 text-left">NAME</th>
								<th className="px-4 py-2 text-left">EMAIL</th>
								<th className="px-4 py-2 text-left">ADMIN</th>
								<th className="px-4 py-2 text-left"></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td className="px-4 py-2">{user._id}</td>
									{/* User Name */}
									<td className="px-4 py-2">
										{updateUserId === user._id ? (
											<div className="flex items-center">
												<input
													type="text"
													value={updateUsername}
													onChange={(e) => setUpdateUsername(e.target.value)}
													className="w-full p-2 border rounded-lg"
												/>
												<button
													onClick={() => updateHandler(user._id)}
													className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
												>
													<FaCheck />
												</button>
											</div>
										) : (
											<div className="flex items-center">
												{user.username}{' '}
												<button
													onClick={() =>
														toggleEdit(user._id, user.username, user.email)
													}
												>
													<FaEdit className="ml-[1rem]" />
												</button>
											</div>
										)}
									</td>
									{/* User Email */}
									<td className="px-4 py-2">
										{updateUserId === user._id ? (
											<div className="flex items-center">
												<input
													type="text"
													value={updateUserEmail}
													onChange={(e) => setUpdateUserEmail(e.target.value)}
													className="w-full p-2 border rounded-lg"
												/>
												<button
													onClick={() => updateHandler(user._id)}
													className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
												>
													<FaCheck />
												</button>
											</div>
										) : (
											<div className="flex items-center">
												<a href={`mailto:${user.email}`}>{user.email}</a>{' '}
												<button
													onClick={() =>
														toggleEdit(user._id, user.username, user.email)
													}
												>
													<FaEdit className="ml-[1rem]" />
												</button>
											</div>
										)}
									</td>
									{/* Admin or Not? */}
									<td className="px-4 py-2">
										{user.isAdmin ? (
											<FaCheck style={{ color: 'green' }} />
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>
									{/* Delete User */}
									<td className="px-4 py-2">
										{!user.isAdmin && (
											<div className="flex">
												<button
													onClick={() => deleteHandler(user._id)}
													className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												>
													<FaTrash />
												</button>
											</div>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UserList;
