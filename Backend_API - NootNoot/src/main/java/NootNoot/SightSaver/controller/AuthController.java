package NootNoot.SightSaver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import NootNoot.SightSaver.response.AuthenticationResponse;
import NootNoot.SightSaver.service.AuthenticationService;
import NootNoot.SightSaver.request.AuthenticationRequest;
import NootNoot.SightSaver.request.RegisterRequest;

@RestController
@RequestMapping("api/auth")
public class AuthController {

   private final AuthenticationService authenticationService;

   @PostMapping("/register")
   public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
      return ResponseEntity.ok(authenticationService.register(request));
   }

   @PostMapping("/authenticate")
   public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
    
   }


}