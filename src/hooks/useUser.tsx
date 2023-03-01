import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
			setUser(user);
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return { user, isLoading };
}
