package sueprtizen.smartclothing.domain.users.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false,nullable = false)
    private int user_id;
    @Column(nullable = false)
    private int family_id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String user_name;
    @Column
    private String profile_img_path;
    @Column
    private LocalDateTime created_at;
    @Column
    private LocalDateTime updated_at;
    @Column
    private int age;
    @Column
    private String gender;
}
