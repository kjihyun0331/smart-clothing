package sueprtizen.smartclothing.socket;

public class GetAllLaundryListStrategy implements RequestStrategy {
    @Override
    public void execute(Long requestNumber) {
        // getAllLaundryList 요청에 대한 로직 구현
        System.out.println("Executing GetAllLaundryList with requestNumber: " + requestNumber);
    }
}