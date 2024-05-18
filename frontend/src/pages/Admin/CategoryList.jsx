import { useState } from 'react';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/CategoryForm.jsx';
import Modal from '../../components/Modal.jsx';
import {
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
	useUpdateCategoryMutation,
} from '../../redux/api/categoryApiSlice.js';

const CategoryList = () => {
	const { data: categories, refetch } = useGetCategoriesQuery();
	const [name, setName] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [updateName, setUpdateName] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const [createCategory] = useCreateCategoryMutation();
	const [updateCategory] = useUpdateCategoryMutation();
	const [deleteCategory] = useDeleteCategoryMutation();

	const handleCreateCategory = async (e) => {
		e.preventDefault();
		if (!name) return toast.error('Category name is required');

		try {
			const result = await createCategory({ name }).unwrap();
			if (result.error) return toast.error(result.error);
			else {
				setName('');
				toast.success(`${result.name} successfully created`);
				refetch();
			}
		} catch (error) {
			console.error(error);
			return toast.error('Creating category failed, try again.');
		}
	};

	const handleUpdateCategory = async (e) => {
		e.preventDefault();
		if (!updateName) return toast.error('Category name is required');

		try {
			const result = await updateCategory({
				categoryId: selectedCategory._id,
				updatedCategory: { name: updateName },
			}).unwrap();
			if (result.error) toast.error(result.error);
			else {
				toast.success(`${result.name} successfully updated`);
				setSelectedCategory(null);
				setUpdateName('');
				setModalVisible(false);
				refetch();
			}
		} catch (error) {
			console.error(error);
			return toast.error('Updating category failed, try again.');
		}
	};

	const handleDeleteCategory = async () => {
		try {
			const result = await deleteCategory(selectedCategory._id).unwrap();
			if (result.error) return toast.error(result.error);
			else {
				toast.success(`Category successfully deleted`);
				setSelectedCategory(null);
				setModalVisible(false);
				refetch();
			}
		} catch (error) {
			console.error(error);
			toast.error('Deleting category failed, try again');
		}
	};

	return (
		<div className="ml-[10rem] flex flex-col md:flex-row">
			<div className="md:w-3/4 p-3">
				<div className="h-12">Manage Categories</div>
				<CategoryForm
					value={name}
					setValue={setName}
					handleSubmit={handleCreateCategory}
				/>
				<br />
				<hr />
				<div className="flex flex-wrap">
					{categories?.map((category) => (
						<div key={category._id}>
							<button
								className=" border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
								onClick={() => {
									{
										setModalVisible(true);
										setSelectedCategory(category);
										setUpdateName(category.name);
									}
								}}
							>
								{category.name}
							</button>
						</div>
					))}
				</div>
				<Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
					<CategoryForm
						value={updateName}
						setValue={(value) => setUpdateName(value)}
						handleSubmit={handleUpdateCategory}
						buttonText="Update"
						handleDelete={handleDeleteCategory}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default CategoryList;
