class UserViewModel : ViewModel() {
    private val _user = MutableLiveData<User>()
    val user: LiveData<User> = _user

    fun loadUser(userId: String) {
        viewModelScope.launch {
            val result = userRepository.getUser(userId)
            _user.value = result
        }
    }
} 